import type { Lesson } from '../../../lib/types/learning';

export const lesson5: Lesson = {
  id: 'blockchain-5',
  categoryId: '8',
  title: 'Blockchain Topic 5',
  slug: 'blockchain-topic-5',
  description: 'Blockchain lesson 5 description',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 5,
  content: {
    sections: [
      {
        type: 'text',
        title: 'Section 1',
        content: 'Content for blockchain lesson 5'
      }
    ],
    keyPoints: ['Key point 1', 'Key point 2'],
    summary: 'Summary for lesson 5',
    practicalExamples: ['Example 1'],
    warningNotes: ['Warning 1']
  },
  quiz: [
    {
      id: 'blockchain-5-q1',
      question: 'Question 1?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Explanation'
    }
  ],
  lastUpdated: '2024-12-10',
  factChecked: true
};
