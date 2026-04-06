// Mock data for ScoreBoost MVP

export interface User {
  id: string;
  name: string;
  email: string;
  class: number;
  board: "CBSE" | "ICSE" | "State";
  subjects: string[];
  streak: number;
  totalPracticed: number;
  avatarUrl?: string;
  isPremium: boolean;
}

export interface Question {
  id: string;
  subject: string;
  topic: string;
  subtopic: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: "easy" | "medium" | "hard";
  explanation: string;
  conceptTag: string;
}

export interface Mistake {
  id: string;
  questionId: string;
  question: Question;
  userAnswer: number;
  timestamp: Date;
  mistakeType: "conceptual" | "careless" | "repeated" | "needs-revision";
  isResolved: boolean;
  attempts: number;
}

export interface StudyPlanTopic {
  id: string;
  subject: string;
  topic: string;
  priority: "high" | "medium" | "low";
  estimatedTime: number; // minutes
  mistakeCount: number;
  lastPracticed?: Date;
}

export interface ProgressData {
  date: string;
  accuracy: number;
  questionsAttempted: number;
}

export interface TopicStrength {
  topic: string;
  subject: string;
  strength: number; // 0-100
  questionsAttempted: number;
  correctAnswers: number;
}

// Mock User
export const mockUser: User = {
  id: "1",
  name: "Arjun Sharma",
  email: "arjun@example.com",
  class: 9,
  board: "CBSE",
  subjects: ["Mathematics", "Science", "English"],
  streak: 7,
  totalPracticed: 342,
  isPremium: false,
};

// Mock Questions
export const mockQuestions: Question[] = [
  {
    id: "q1",
    subject: "Mathematics",
    topic: "Algebra",
    subtopic: "Linear Equations",
    text: "If 3x + 7 = 22, what is the value of x?",
    options: ["3", "5", "7", "15"],
    correctAnswer: 1,
    difficulty: "easy",
    explanation: "To solve 3x + 7 = 22, subtract 7 from both sides to get 3x = 15. Then divide both sides by 3 to get x = 5.",
    conceptTag: "Solving Linear Equations",
  },
  {
    id: "q2",
    subject: "Science",
    topic: "Chemistry",
    subtopic: "Chemical Equations",
    text: "What is the balanced equation for the reaction between hydrogen and oxygen to form water?",
    options: [
      "H₂ + O₂ → H₂O",
      "2H₂ + O₂ → 2H₂O",
      "H₂ + O → H₂O",
      "2H + O₂ → H₂O",
    ],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "To balance the equation, we need 2 molecules of H₂ and 1 molecule of O₂ to form 2 molecules of H₂O. This ensures equal atoms on both sides.",
    conceptTag: "Balancing Chemical Equations",
  },
  {
    id: "q3",
    subject: "Mathematics",
    topic: "Geometry",
    subtopic: "Triangles",
    text: "In a right triangle, if one angle is 30°, what is the third angle?",
    options: ["30°", "45°", "60°", "90°"],
    correctAnswer: 2,
    difficulty: "easy",
    explanation: "Sum of angles in a triangle = 180°. Given one angle is 90° (right angle) and another is 30°, the third angle = 180° - 90° - 30° = 60°.",
    conceptTag: "Angle Sum Property",
  },
  {
    id: "q4",
    subject: "Science",
    topic: "Physics",
    subtopic: "Motion",
    text: "A car travels 100 km in 2 hours. What is its average speed?",
    options: ["25 km/h", "50 km/h", "100 km/h", "200 km/h"],
    correctAnswer: 1,
    difficulty: "easy",
    explanation: "Average speed = Total distance / Total time = 100 km / 2 hours = 50 km/h.",
    conceptTag: "Speed, Distance, Time",
  },
  {
    id: "q5",
    subject: "Mathematics",
    topic: "Algebra",
    subtopic: "Quadratic Equations",
    text: "What are the roots of x² - 5x + 6 = 0?",
    options: ["1 and 6", "2 and 3", "-2 and -3", "1 and 5"],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "Factoring: x² - 5x + 6 = (x - 2)(x - 3) = 0. So x = 2 or x = 3.",
    conceptTag: "Factoring Quadratics",
  },
];

// Mock Mistakes
export const mockMistakes: Mistake[] = [
  {
    id: "m1",
    questionId: "q2",
    question: mockQuestions[1],
    userAnswer: 0,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    mistakeType: "conceptual",
    isResolved: false,
    attempts: 1,
  },
  {
    id: "m2",
    questionId: "q5",
    question: mockQuestions[4],
    userAnswer: 2,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    mistakeType: "careless",
    isResolved: false,
    attempts: 2,
  },
  {
    id: "m3",
    questionId: "q1",
    question: mockQuestions[0],
    userAnswer: 3,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    mistakeType: "repeated",
    isResolved: false,
    attempts: 3,
  },
  {
    id: "m4",
    questionId: "q3",
    question: mockQuestions[2],
    userAnswer: 1,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
    mistakeType: "needs-revision",
    isResolved: true,
    attempts: 1,
  },
];

// Today's Study Plan
export const mockStudyPlan: StudyPlanTopic[] = [
  {
    id: "sp1",
    subject: "Mathematics",
    topic: "Quadratic Equations",
    priority: "high",
    estimatedTime: 10,
    mistakeCount: 5,
    lastPracticed: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "sp2",
    subject: "Science",
    topic: "Chemical Equations",
    priority: "high",
    estimatedTime: 8,
    mistakeCount: 3,
    lastPracticed: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: "sp3",
    subject: "Mathematics",
    topic: "Linear Equations",
    priority: "medium",
    estimatedTime: 6,
    mistakeCount: 2,
  },
  {
    id: "sp4",
    subject: "Science",
    topic: "Motion",
    priority: "low",
    estimatedTime: 5,
    mistakeCount: 1,
  },
];

// Progress Data (last 7 days)
export const mockProgressData: ProgressData[] = [
  { date: "Mon", accuracy: 65, questionsAttempted: 15 },
  { date: "Tue", accuracy: 70, questionsAttempted: 20 },
  { date: "Wed", accuracy: 68, questionsAttempted: 18 },
  { date: "Thu", accuracy: 75, questionsAttempted: 22 },
  { date: "Fri", accuracy: 72, questionsAttempted: 16 },
  { date: "Sat", accuracy: 78, questionsAttempted: 25 },
  { date: "Today", accuracy: 82, questionsAttempted: 12 },
];

// Topic Strengths
export const mockTopicStrengths: TopicStrength[] = [
  { topic: "Linear Equations", subject: "Mathematics", strength: 85, questionsAttempted: 45, correctAnswers: 38 },
  { topic: "Triangles", subject: "Mathematics", strength: 78, questionsAttempted: 32, correctAnswers: 25 },
  { topic: "Motion", subject: "Science", strength: 72, questionsAttempted: 28, correctAnswers: 20 },
  { topic: "Quadratic Equations", subject: "Mathematics", strength: 55, questionsAttempted: 40, correctAnswers: 22 },
  { topic: "Chemical Equations", subject: "Science", strength: 45, questionsAttempted: 35, correctAnswers: 16 },
  { topic: "Electricity", subject: "Science", strength: 38, questionsAttempted: 24, correctAnswers: 9 },
];

// Score Prediction
export const mockScorePrediction = {
  min: 68,
  max: 74,
  current: 71,
  previousWeek: 65,
  trend: "up" as const,
};

// Insights
export const mockInsights = [
  {
    id: "i1",
    type: "improvement" as const,
    message: "You&apos;ve improved in Algebra by 18% this week.",
    subject: "Mathematics",
  },
  {
    id: "i2",
    type: "warning" as const,
    message: "You still make repeated mistakes in Chemical Equations.",
    subject: "Science",
  },
  {
    id: "i3",
    type: "goal" as const,
    message: "At your current pace, you&apos;ll cover all weak topics in 9 days.",
    subject: null,
  },
];

// Stats for dashboard
export const mockStats = {
  questionsToday: 12,
  accuracyToday: 82,
  mistakesToday: 3,
  streakDays: 7,
  weeklyGoal: 100,
  weeklyCompleted: 78,
};
