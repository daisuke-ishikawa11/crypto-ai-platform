import type { Lesson } from '../../../types';

export const lesson12: Lesson = {
  id: 'blockchain-12',
  categoryId: '8',
  title: 'Blockchain Topic 12',
  slug: 'blockchain-topic-12',
  description: 'Blockchain lesson 12 description',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 12,
  content: {
    sections: [
      {
        title: 'Section 1',
        content: 'Content for blockchain lesson 12'
      }
    ],
    keyPoints: ['Key point 1', 'Key point 2'],
    summary: 'Summary for lesson 12',
    practicalExamples: ['Example 1'],
    warningNotes: ['Warning 1']
  },
  quiz: [
    {
      id: 'blockchain-12-q1',
      question: 'Question 1?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Explanation'
    }
  ],
  lastUpdated: '2024-12-10',
  factChecked: true
};
