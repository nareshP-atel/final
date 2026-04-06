"use client";

import Link from "next/link";
import {
  Trophy,
  Target,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  RotateCcw,
  Home,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/utils";

interface SessionResult {
  questionId: string;
  isCorrect: boolean;
  subject: string;
  topic: string;
}

interface SessionSummaryProps {
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  results: SessionResult[];
  mistakesLogged: number;
  onPracticeAgain: () => void;
}

export function SessionSummary({
  totalQuestions,
  correctAnswers,
  timeTaken,
  results,
  mistakesLogged,
  onPracticeAgain,
}: SessionSummaryProps) {
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const incorrectAnswers = totalQuestions - correctAnswers;

  // Group results by topic for breakdown
  const topicBreakdown = results.reduce(
    (acc, result) => {
      const key = `${result.subject}-${result.topic}`;
      if (!acc[key]) {
        acc[key] = { subject: result.subject, topic: result.topic, correct: 0, total: 0 };
      }
      acc[key].total++;
      if (result.isCorrect) acc[key].correct++;
      return acc;
    },
    {} as Record<string, { subject: string; topic: string; correct: number; total: number }>
  );

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return { text: "Excellent work!", color: "text-success-600" };
    if (accuracy >= 70) return { text: "Good job!", color: "text-primary-600" };
    if (accuracy >= 50) return { text: "Keep practicing!", color: "text-warning-600" };
    return { text: "Don&apos;t give up!", color: "text-error-600" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      {/* Header Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8 text-center text-white">
          <Trophy className="mx-auto mb-4 h-12 w-12" />
          <h2 className="font-[var(--font-poppins)] text-2xl font-bold">
            Session Complete!
          </h2>
          <p className={cn("mt-2 text-lg", "text-primary-100")}>
            {performance.text}
          </p>
        </div>

        <CardContent className="p-6">
          {/* Score Display */}
          <div className="mb-6 text-center">
            <div className="text-5xl font-bold text-neutral-900">
              {correctAnswers}/{totalQuestions}
            </div>
            <p className="mt-1 text-neutral-500">questions correct</p>
          </div>

          {/* Accuracy Bar */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-neutral-500">Accuracy</span>
              <span className="font-semibold text-neutral-900">{accuracy}%</span>
            </div>
            <Progress
              value={accuracy}
              size="lg"
              indicatorClassName={cn(
                accuracy >= 70
                  ? "bg-success-500"
                  : accuracy >= 50
                    ? "bg-warning-500"
                    : "bg-error-500"
              )}
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-success-50 p-3 text-center">
              <CheckCircle className="mx-auto mb-1 h-5 w-5 text-success-600" />
              <p className="text-xl font-bold text-success-700">{correctAnswers}</p>
              <p className="text-xs text-success-600">Correct</p>
            </div>
            <div className="rounded-lg bg-error-50 p-3 text-center">
              <AlertCircle className="mx-auto mb-1 h-5 w-5 text-error-600" />
              <p className="text-xl font-bold text-error-700">{incorrectAnswers}</p>
              <p className="text-xs text-error-600">Incorrect</p>
            </div>
            <div className="rounded-lg bg-primary-50 p-3 text-center">
              <Clock className="mx-auto mb-1 h-5 w-5 text-primary-600" />
              <p className="text-xl font-bold text-primary-700">
                {formatTime(timeTaken)}
              </p>
              <p className="text-xs text-primary-600">Time</p>
            </div>
            <div className="rounded-lg bg-warning-50 p-3 text-center">
              <Target className="mx-auto mb-1 h-5 w-5 text-warning-600" />
              <p className="text-xl font-bold text-warning-700">{mistakesLogged}</p>
              <p className="text-xs text-warning-600">Logged</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topic Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Topic Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.values(topicBreakdown).map((topic) => {
            const topicAccuracy = Math.round((topic.correct / topic.total) * 100);
            return (
              <div
                key={`${topic.subject}-${topic.topic}`}
                className="flex items-center justify-between rounded-lg border border-neutral-200 p-3"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{topic.subject.slice(0, 4)}</Badge>
                  <span className="font-medium text-neutral-900">{topic.topic}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-500">
                    {topic.correct}/{topic.total}
                  </span>
                  <Badge
                    variant={
                      topicAccuracy >= 70
                        ? "success"
                        : topicAccuracy >= 50
                          ? "warning"
                          : "error"
                    }
                  >
                    {topicAccuracy}%
                  </Badge>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" className="flex-1" asChild>
          <Link href="/dashboard">
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <Button variant="secondary" className="flex-1" asChild>
          <Link href="/mistakes">
            <AlertCircle className="mr-2 h-4 w-4" />
            Review Mistakes
          </Link>
        </Button>
        <Button className="flex-1" onClick={onPracticeAgain}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Practice Again
        </Button>
      </div>
    </div>
  );
}
