import type { Lesson } from '../../../types';

export const lesson17: Lesson = {
  id: 'blockchain-17',
  categoryId: '8',
  title: 'Blockchain Topic 17',
  slug: 'blockchain-topic-17',
  description: 'Blockchain lesson 17 description',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 17,
  content: {
    sections: [
      {
        title: 'Section 1',
        content: 'Content for blockchain lesson 17'
      }
    ],
    keyPoints: ['Key point 1', 'Key point 2'],
    summary: 'Summary for lesson 17',
    practicalExamples: ['Example 1'],
    warningNotes: ['Warning 1']
  },
  quiz: [
    {
      id: 'blockchain-17-q1',
      question: 'Question 1?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Explanation'
    }
  ],
  lastUpdated: '2024-12-10',
  factChecked: true
};
