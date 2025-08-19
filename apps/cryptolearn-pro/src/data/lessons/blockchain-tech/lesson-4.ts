import type { Lesson } from '../../../types';

export const lesson4: Lesson = {
  id: 'blockchain-4',
  categoryId: '8',
  title: 'Blockchain Topic 4',
  slug: 'blockchain-topic-4',
  description: 'Blockchain lesson 4 description',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 4,
  content: {
    sections: [
      {
        title: 'Section 1',
        content: 'Content for blockchain lesson 4'
      }
    ],
    keyPoints: ['Key point 1', 'Key point 2'],
    summary: 'Summary for lesson 4',
    practicalExamples: ['Example 1'],
    warningNotes: ['Warning 1']
  },
  quiz: [
    {
      id: 'blockchain-4-q1',
      question: 'Question 1?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Explanation'
    }
  ],
  lastUpdated: '2024-12-10',
  factChecked: true
};
