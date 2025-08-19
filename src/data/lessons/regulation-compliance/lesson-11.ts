import type { Lesson } from '../../../lib/types/learning';

export const lesson11: Lesson = {
  id: 'regulation-11',
  categoryId: '7',
  title: 'Regulation Topic 11',
  slug: 'regulation-topic-11',
  description: 'Regulation lesson 11 description',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 11,
  content: {
    sections: [
      {
        type: 'text',
        title: 'Section 1',
        content: 'Content for regulation lesson 11'
      }
    ],
    keyPoints: ['Key point 1', 'Key point 2'],
    summary: 'Summary for lesson 11',
    practicalExamples: ['Example 1'],
    warningNotes: ['Warning 1']
  },
  quiz: [
    {
      id: 'regulation-11-q1',
      question: 'Question 1?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Explanation'
    }
  ],
  lastUpdated: '2024-12-10',
  factChecked: true
};
