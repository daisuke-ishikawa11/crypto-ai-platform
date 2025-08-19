'use client';

import * as React from "react"
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  BookOpen,
  Trophy,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';
import { learningService } from '@/lib/services/learning.service';
import { createClient } from '@/lib/supabase/client';
import type { Lesson, LessonSection } from '@/lib/types/learning';
import ReactMarkdown from 'react-markdown';

// LessonPagePropsインターフェースは不要なので削除

interface QuizMetadata {
  questions: Array<{
    id?: string;
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation?: string;
  }>;
}

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const timeSpentRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadLesson = React.useCallback(async () => {
    try {
      const supabase = createClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error('Authentication error:', authError);
        // 認証エラーの場合でもゲストとして続行
      } else if (user) {
        setUserId(user.id);
      }

      const lessonData = await learningService.getLessonBySlug(slug);
      if (!lessonData) {
        console.error('Lesson not found:', slug);
        router.push('/learning');
        return;
      }
      setLesson(lessonData);

      // 既存の進捗を確認（ログインユーザーのみ）
      if (user) {
        try {
          const progressData = await learningService.getUserProgress(user.id, lessonData.id);
          if (progressData) {
            const pg = progressData as Record<string, unknown> | null
            setProgress(typeof pg?.progressPercentage === 'number' ? (pg.progressPercentage as number) : 0);
          }
        } catch (progressError) {
          console.error('Failed to load progress:', progressError);
          // 進捗データの読み込みに失敗してもレッスンは表示する
        }
      }
    } catch (error) {
      console.error('Failed to load lesson:', error);
      // より具体的なエラー表示やフォールバック処理を追加可能
    } finally {
      setLoading(false);
    }
  }, [slug, router]);

  // レッスン読み込み
  useEffect(() => {
    loadLesson();
  }, [loadLesson]);

  // 学習時間の記録
  useEffect(() => {
    // 学習時間の記録開始
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      timeSpentRef.current = Math.floor((Date.now() - startTime) / 1000);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      // 学習時間を記録
      if (userId && lesson) {
        learningService.recordTimeSpent(userId, lesson.id, timeSpentRef.current);
      }
    };
  }, [lesson, userId]);

  const updateProgress = React.useCallback(async () => {
    if (!lesson || !userId) return;

    const progressPercentage = Math.round(((currentSectionIndex + 1) / lesson.content.sections.length) * 100);
    const status: 'completed' | 'in_progress' = progressPercentage === 100 ? 'completed' : 'in_progress';

    try {
      await learningService.updateProgress(userId, lesson.id, {
        status: status,
        progressPercentage: progressPercentage
      });
      setProgress(progressPercentage);
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  }, [lesson, userId, currentSectionIndex]);

  useEffect(() => {
    if (lesson && userId) {
      updateProgress();
    }
  }, [updateProgress, lesson, userId]);


  const handleNext = () => {
    if (!lesson) return;
    
    if (currentSectionIndex < lesson.content.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setShowQuizResult(false);
      setQuizAnswer('');
    } else if (progress < 100) {
      // 最後のセクションで完了処理
      updateProgress();
      // 完了時にチケット付与（非同期、副作用はサイレント）
      try {
        const uid = userId || 'guest';
        fetch('/api/learning/rewards/lesson-completed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: uid, lessonId: lesson.id, tickets: 1 })
        }).catch(() => {})
      } catch {}
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setShowQuizResult(false);
      setQuizAnswer('');
    }
  };

  const handleQuizSubmit = () => {
    if (!lesson || !quizAnswer) return;

    const currentSection = lesson.content.sections[currentSectionIndex];
    if (currentSection.type === 'quiz' && currentSection.metadata) {
      const quizMetadata = currentSection.metadata as QuizMetadata;
      if (quizMetadata.questions && quizMetadata.questions.length > 0) {
        const question = quizMetadata.questions[0];
        if (question && question.correctAnswer) {
          const isCorrect = quizAnswer === question.correctAnswer;
          setQuizCorrect(isCorrect);
          setShowQuizResult(true);
        }
      }
    }
  };

  const renderSection = (section: LessonSection) => {
    switch (section.type) {
      case 'text':
        return (
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown>{section.content || ''}</ReactMarkdown>
          </div>
        );

      case 'warning':
        return (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <ReactMarkdown>{section.content || ''}</ReactMarkdown>
            </AlertDescription>
          </Alert>
        );

      case 'tip':
        return (
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              <ReactMarkdown>{section.content || ''}</ReactMarkdown>
            </AlertDescription>
          </Alert>
        );

      case 'example':
        return (
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <ReactMarkdown>{section.content || ''}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        );

      case 'quiz':
        const quizMetadata = section.metadata as QuizMetadata | undefined;
        const question = quizMetadata?.questions?.[0];
        if (!question) return null;

        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                {section.content}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-medium">{question.question}</p>
              
              <RadioGroup value={quizAnswer} onValueChange={setQuizAnswer}>
                {question.options?.map((option: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {!showQuizResult && (
                <Button onClick={handleQuizSubmit} disabled={!quizAnswer}>
                  回答を確認
                </Button>
              )}

              {showQuizResult && (
                <Alert variant={quizCorrect ? 'default' : 'destructive'}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {quizCorrect ? '正解です！' : '不正解です。もう一度考えてみましょう。'}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return null;
  }

  const currentSection = lesson.content.sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === lesson.content.sections.length - 1;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* ヘッダー */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.push('/learning')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          学習センターに戻る
        </Button>
      </div>

      {/* レッスン情報 */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{lesson.title}</CardTitle>
              <CardDescription className="mt-2">
                {lesson.description}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {lesson.estimatedMinutes}分
              </Badge>
              {progress === 100 && (
                <Badge variant="default">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  完了
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>進捗: {progress}%</span>
              <span>
                {currentSectionIndex + 1} / {lesson.content.sections.length} セクション
              </span>
            </div>
            <Progress value={progress} />
          </div>
        </CardContent>
      </Card>

      {/* レッスンコンテンツ */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          {renderSection(currentSection)}
        </CardContent>
      </Card>

      {/* ナビゲーション */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentSectionIndex === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          前へ
        </Button>

        <span className="text-sm text-muted-foreground">
          {currentSectionIndex + 1} / {lesson.content.sections.length}
        </span>

        <Button
          onClick={handleNext}
          disabled={isLastSection && progress === 100}
        >
          {isLastSection && progress < 100 ? '完了' : '次へ'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* 重要ポイント（最後のセクション） */}
      {isLastSection && lesson.content.keyPoints && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              このレッスンの重要ポイント
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {lesson.content.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 
