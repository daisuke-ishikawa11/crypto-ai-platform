import type { Lesson } from '../../../lib/types/learning';

export const lesson8: Lesson = {
  id: 'blockchain-8',
  categoryId: '8',
  title: 'Blockchain Topic 8',
  slug: 'blockchain-topic-8',
  description: 'Blockchain lesson 8 description',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 8,
  content: {
    sections: [
      {
        type: 'text',
        title: 'Section 1',
        content: 'Content for blockchain lesson 8'
      }
    ],
    keyPoints: ['Key point 1', 'Key point 2'],
    summary: 'Summary for lesson 8',
    practicalExamples: ['Example 1'],
    warningNotes: ['Warning 1']
  },
  quiz: [
    {
      id: 'blockchain-8-q1',
      question: 'Question 1?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Explanation'
    }
  ],
  lastUpdated: '2024-12-10',
  factChecked: true
};
