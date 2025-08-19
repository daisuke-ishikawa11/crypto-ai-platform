import type { Lesson } from '../../../types';

export const lesson6: Lesson = {
  id: 'blockchain-6',
  categoryId: '8',
  title: 'Blockchain Topic 6',
  slug: 'blockchain-topic-6',
  description: 'Blockchain lesson 6 description',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 6,
  content: {
    sections: [
      {
        title: 'Section 1',
        content: 'Content for blockchain lesson 6'
      }
    ],
    keyPoints: ['Key point 1', 'Key point 2'],
    summary: 'Summary for lesson 6',
    practicalExamples: ['Example 1'],
    warningNotes: ['Warning 1']
  },
  quiz: [
    {
      id: 'blockchain-6-q1',
      question: 'Question 1?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Explanation'
    }
  ],
  lastUpdated: '2024-12-10',
  factChecked: true
};
