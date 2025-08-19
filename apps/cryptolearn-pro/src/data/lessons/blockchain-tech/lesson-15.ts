import type { Lesson } from '../../../types';

export const lesson15: Lesson = {
  id: 'blockchain-15',
  categoryId: '8',
  title: 'Blockchain Topic 15',
  slug: 'blockchain-topic-15',
  description: 'Blockchain lesson 15 description',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 15,
  content: {
    sections: [
      {
        title: 'Section 1',
        content: 'Content for blockchain lesson 15'
      }
    ],
    keyPoints: ['Key point 1', 'Key point 2'],
    summary: 'Summary for lesson 15',
    practicalExamples: ['Example 1'],
    warningNotes: ['Warning 1']
  },
  quiz: [
    {
      id: 'blockchain-15-q1',
      question: 'Question 1?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Explanation'
    }
  ],
  lastUpdated: '2024-12-10',
  factChecked: true
};
