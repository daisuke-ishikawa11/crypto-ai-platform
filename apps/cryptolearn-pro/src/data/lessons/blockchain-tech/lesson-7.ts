import type { Lesson } from '../../../types';

export const lesson7: Lesson = {
  id: 'blockchain-7',
  categoryId: '8',
  title: 'Blockchain Topic 7',
  slug: 'blockchain-topic-7',
  description: 'Blockchain lesson 7 description',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 7,
  content: {
    sections: [
      {
        title: 'Section 1',
        content: 'Content for blockchain lesson 7'
      }
    ],
    keyPoints: ['Key point 1', 'Key point 2'],
    summary: 'Summary for lesson 7',
    practicalExamples: ['Example 1'],
    warningNotes: ['Warning 1']
  },
  quiz: [
    {
      id: 'blockchain-7-q1',
      question: 'Question 1?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Explanation'
    }
  ],
  lastUpdated: '2024-12-10',
  factChecked: true
};
