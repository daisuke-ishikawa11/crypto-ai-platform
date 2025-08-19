import type { Lesson } from '../../../types';

export const lesson19: Lesson = {
  id: 'blockchain-19',
  categoryId: '8',
  title: 'Blockchain Topic 19',
  slug: 'blockchain-topic-19',
  description: 'Blockchain lesson 19 description',
  difficultyLevel: 'intermediate',
  estimatedMinutes: 30,
  orderIndex: 19,
  content: {
    sections: [
      {
        title: 'Section 1',
        content: 'Content for blockchain lesson 19'
      }
    ],
    keyPoints: ['Key point 1', 'Key point 2'],
    summary: 'Summary for lesson 19',
    practicalExamples: ['Example 1'],
    warningNotes: ['Warning 1']
  },
  quiz: [
    {
      id: 'blockchain-19-q1',
      question: 'Question 1?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Explanation'
    }
  ],
  lastUpdated: '2024-12-10',
  factChecked: true
};
