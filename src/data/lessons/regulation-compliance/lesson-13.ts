import type { Lesson } from '../../../lib/types/learning';

export const lesson13: Lesson = {
  id: 'regulation-13',
  categoryId: '7',
  title: 'Regulation Topic 13',
  slug: 'regulation-topic-13',
  description: 'Regulation lesson 13 description',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 13,
  content: {
    sections: [
      {
        type: 'text',
        title: 'Section 1',
        content: 'Content for regulation lesson 13'
      }
    ],
    keyPoints: ['Key point 1', 'Key point 2'],
    summary: 'Summary for lesson 13',
    practicalExamples: ['Example 1'],
    warningNotes: ['Warning 1']
  },
  quiz: [
    {
      id: 'regulation-13-q1',
      question: 'Question 1?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Explanation'
    }
  ],
  lastUpdated: '2024-12-10',
  factChecked: true
};
