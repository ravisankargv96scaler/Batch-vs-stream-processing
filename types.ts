export enum TabId {
  CONCEPT = 'concept',
  BATCH = 'batch',
  STREAM = 'stream',
  COMPARISON = 'comparison',
  USE_CASES = 'use_cases',
  QUIZ = 'quiz'
}

export interface Scenario {
  id: number;
  description: string;
  correctAnswer: 'batch' | 'stream';
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}