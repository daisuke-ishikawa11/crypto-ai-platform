import type { Lesson } from '../../../types';

export const lesson20: Lesson = {
  id: 'blockchain-20',
  categoryId: '8',
  title: 'Blockchain Topic 20',
  slug: 'blockchain-topic-20',
  description: 'Blockchain lesson 20 description',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 20,
  content: {
    sections: [
      {
        title: 'Section 1',
        content: 'Content for blockchain lesson 20'
      }
    ],
    keyPoints: ['Key point 1', 'Key point 2'],
    summary: 'Summary for lesson 20',
    practicalExamples: ['Example 1'],
    warningNotes: ['Warning 1']
  },
  quiz: [
    {
      id: 'blockchain-20-q1',
      question: 'Question 1?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Explanation'
    }
  ],
  lastUpdated: '2024-12-10',
  factChecked: true
};
