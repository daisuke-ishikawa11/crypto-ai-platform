import type { Lesson, CategoryTest } from '../../../types';

// Import all risk management lessons
import { lesson1 } from './lesson-1';
import { lesson2 } from './lesson-2';
import { lesson3 } from './lesson-3';
import { lesson4 } from './lesson-4';
import { lesson5 } from './lesson-5';
import { lesson6 } from './lesson-6';
import { lesson7 } from './lesson-7';
import { lesson8 } from './lesson-8';
import { lesson9 } from './lesson-9';
import { lesson10 } from './lesson-10';
import { lesson11 } from './lesson-11';
import { lesson12 } from './lesson-12';
import { lesson13 } from './lesson-13';
import { lesson14 } from './lesson-14';
import { lesson15 } from './lesson-15';
import { lesson16 } from './lesson-16';
import { lesson17 } from './lesson-17';
import { lesson18 } from './lesson-18';
import { lesson19 } from './lesson-19';
import { lesson20 } from './lesson-20';
import { lesson21 } from './lesson-21';
import { lesson22 } from './lesson-22';
import { lesson23 } from './lesson-23';
import { lesson24 } from './lesson-24';
import { lesson25 } from './lesson-25';

// Import category test and lesson tests
import { riskManagementCategoryTest } from './category-test';
import { riskManagementTest1 } from './test-1';
import { riskManagementTest2 } from './test-2';
import { riskManagementTest3 } from './test-3';
import { riskManagementTest4 } from './test-4';
import { riskManagementTest5 } from './test-5';

/**
 * Risk Management & Investment Psychology Category
 * 25 lessons covering investment psychology, cognitive biases, portfolio risk management,
 * stress testing, mental health, risk budgeting, crisis management, AI investment risks, etc.
 * 
 * Lessons 1-5:   Investment Psychology Basics
 * Lessons 6-10:  Portfolio Risk Management
 * Lessons 11-15: Risk Measurement & Stress Testing
 * Lessons 16-20: Mental Health & Crisis Management
 * Lessons 21-25: Advanced Risk & AI Investment
 * 
 * Updated: 2025-08-21
 * Total: 25 lessons + 6 tests (1 category test + 5 lesson range tests)
 */
export const riskManagementLessons: Lesson[] = [
  lesson1, lesson2, lesson3, lesson4, lesson5,
  lesson6, lesson7, lesson8, lesson9, lesson10,
  lesson11, lesson12, lesson13, lesson14, lesson15,
  lesson16, lesson17, lesson18, lesson19, lesson20,
  lesson21, lesson22, lesson23, lesson24, lesson25
];

export const riskManagementTests: CategoryTest[] = [
  riskManagementTest1,
  riskManagementTest2,
  riskManagementTest3,
  riskManagementTest4,
  riskManagementTest5,
  riskManagementCategoryTest
];