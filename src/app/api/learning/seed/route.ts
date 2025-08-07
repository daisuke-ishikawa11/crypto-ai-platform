import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { lessonCategories } from '@/data/lessons/categories'
import { allLessons } from '@/data/lessons'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(request: Request) {
  try {
    // 開発環境のみ許可
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 })
    }

    // カテゴリを挿入
    const categoriesToInsert = lessonCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      order_index: cat.orderIndex,
      icon: cat.icon,
      is_published: true
    }))

    const { error: categoryError } = await supabaseAdmin
      .from('lesson_categories')
      .upsert(categoriesToInsert, { onConflict: 'id' })

    if (categoryError) {
      console.error('Category insert error:', categoryError)
      return NextResponse.json({ error: categoryError.message }, { status: 500 })
    }

    // レッスンを挿入
    const lessonsToInsert = allLessons.map(lesson => ({
      id: lesson.id,
      category_id: lesson.categoryId,
      title: lesson.title,
      slug: lesson.slug,
      description: lesson.description,
      content: lesson.content,
      difficulty_level: lesson.difficultyLevel,
      duration_minutes: lesson.estimatedMinutes,
      order_index: lesson.orderIndex,
      is_published: lesson.isPublished || true
    }))

    const { error: lessonError } = await supabaseAdmin
      .from('lessons')
      .upsert(lessonsToInsert, { onConflict: 'id' })

    if (lessonError) {
      console.error('Lesson insert error:', lessonError)
      return NextResponse.json({ error: lessonError.message }, { status: 500 })
    }

    // クイズ質問を挿入
    interface QuizSection {
      type: string;
      questions?: QuizQuestionRaw[];
    }

    interface QuizQuestionRaw {
      id: string;
      questionType: string;
      question: string;
      options: string[];
      correctAnswer: string;
      explanation?: string;
    }

    const quizQuestions: {
      id: string;
      lesson_id: string;
      question_type: string;
      question: string;
      options: string[];
      correct_answer: string;
      explanation?: string;
    }[] = [];

    allLessons.forEach(lesson => {
      // sectionの型をanyではなく、型ガードを用いて安全にQuizSectionかどうかを判定する
      const quizSection = lesson.content.sections.find(
        (section: unknown): section is QuizSection =>
          typeof section === 'object' &&
          section !== null &&
          (section as { type?: unknown }).type === 'quiz' &&
          Array.isArray((section as { questions?: unknown }).questions) &&
          (section as { questions: unknown[] }).questions.every((q: unknown) =>
            typeof q === 'object' &&
            q !== null &&
            typeof (q as { id?: unknown }).id === 'string' &&
            typeof (q as { questionType?: unknown }).questionType === 'string' &&
            typeof (q as { question?: unknown }).question === 'string' &&
            Array.isArray((q as { options?: unknown }).options) &&
            (q as { options: unknown[] }).options.every((opt: unknown) => typeof opt === 'string') &&
            typeof (q as { correctAnswer?: unknown }).correctAnswer === 'string'
          )
      );

      if (
        typeof quizSection === 'object' &&
        quizSection !== null &&
        Array.isArray(quizSection.questions)
      ) {
        quizSection.questions.forEach((question) => {
          if (
            typeof question.id === 'string' &&
            typeof question.questionType === 'string' &&
            typeof question.question === 'string' &&
            Array.isArray(question.options) &&
            question.options.every((opt: string) => typeof opt === 'string') &&
            typeof question.correctAnswer === 'string'
          ) {
            quizQuestions.push({
              id: question.id,
              lesson_id: lesson.id,
              question_type: question.questionType,
              question: question.question,
              options: question.options,
              correct_answer: question.correctAnswer,
              explanation: question.explanation
            });
          }
        });
      }
    })

    if (quizQuestions.length > 0) {
      const { error: quizError } = await supabaseAdmin
        .from('quiz_questions')
        .upsert(quizQuestions, { onConflict: 'id' })

      if (quizError) {
        console.error('Quiz insert error:', quizError)
        return NextResponse.json({ error: quizError.message }, { status: 500 })
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Seeded ${categoriesToInsert.length} categories, ${lessonsToInsert.length} lessons, and ${quizQuestions.length} quiz questions` 
    })

  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 