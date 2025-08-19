import type { Lesson } from '../../../types';

export const lesson14: Lesson = {
  id: 'regulation-14',
  categoryId: '7',
  title: 'Regulation Topic 14',
  slug: 'regulation-topic-14',
  description: 'Regulation lesson 14 description',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 14,
  content: {
    sections: [
      {
        title: 'Section 1',
        content: 'Content for regulation lesson 14'
      }
    ],
    keyPoints: ['Key point 1', 'Key point 2'],
    summary: 'Summary for lesson 14',
    practicalExamples: ['Example 1'],
    warningNotes: ['Warning 1']
  },
  quiz: [
    {
      id: 'regulation-14-q1',
      question: 'Question 1?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Explanation'
    }
  ],
  lastUpdated: '2024-12-10',
  factChecked: true
};
