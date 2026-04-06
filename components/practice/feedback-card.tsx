"use client";

import { CheckCircle, XCircle, BookOpen, ArrowRight, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/mock-data";

interface FeedbackCardProps {
  question: Question;
  userAnswer: number;
  isCorrect: boolean;
  onNext: () => void;
  onLogMistake?: () => void;
  isLastQuestion?: boolean;
}

export function FeedbackCard({
  question,
  userAnswer,
  isCorrect,
  onNext,
  onLogMistake,
  isLastQuestion = false,
}: FeedbackCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-2xl mx-auto animate-slide-up overflow-hidden",
        isCorrect ? "border-success-200" : "border-error-200"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center gap-3 px-6 py-4",
          isCorrect ? "bg-success-50" : "bg-error-50"
        )}
      >
        {isCorrect ? (
          <>
            <CheckCircle className="h-6 w-6 text-success-600" />
            <div>
              <p className="font-semibold text-success-700">Correct!</p>
              <p className="text-sm text-success-600">Great job, keep it up!</p>
            </div>
          </>
        ) : (
          <>
            <XCircle className="h-6 w-6 text-error-600" />
            <div>
              <p className="font-semibold text-error-700">Not quite right</p>
              <p className="text-sm text-error-600">
                Let&apos;s understand why
              </p>
            </div>
          </>
        )}
      </div>

      <CardContent className="space-y-4 p-6">
        {/* Answer Comparison (only for wrong answers) */}
        {!isCorrect && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-500">Your answer:</span>
              <span className="font-medium text-error-600">
                {question.options[userAnswer]}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-500">Correct answer:</span>
              <span className="font-medium text-success-600">
                {question.options[question.correctAnswer]}
              </span>
            </div>
          </div>
        )}

        {/* Explanation */}
        <div className="rounded-lg bg-neutral-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium text-neutral-700">
              Explanation
            </span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-600">
            {question.explanation}
          </p>
        </div>

        {/* Concept Tag */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-500">Concept:</span>
          <Badge variant="default">{question.conceptTag}</Badge>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          {!isCorrect && onLogMistake && (
            <Button
              variant="secondary"
              className="flex-1"
              onClick={onLogMistake}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Log Mistake
            </Button>
          )}
          <Button className="flex-1" onClick={onNext}>
            {isLastQuestion ? "View Summary" : "Next Question"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
