"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Question } from "@/lib/mock-data";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  showResult?: boolean;
  disabled?: boolean;
}

const difficultyColors = {
  easy: "bg-success-100 text-success-700",
  medium: "bg-warning-100 text-warning-600",
  hard: "bg-error-100 text-error-700",
};

export function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  showResult = false,
  disabled = false,
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Question Header */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{question.subject}</Badge>
        <Badge variant="outline">{question.topic}</Badge>
        <Badge className={difficultyColors[question.difficulty]}>
          {question.difficulty}
        </Badge>
      </div>

      {/* Question Text */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow-card border border-neutral-200">
        <p className="text-lg font-medium text-neutral-900 leading-relaxed">
          {question.text}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          const showCorrect = showResult && isCorrect;
          const showWrong = showResult && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => !disabled && onSelectAnswer(index)}
              disabled={disabled}
              className={cn(
                "w-full rounded-lg border-2 p-4 text-left transition-all duration-150",
                "hover:border-primary-300 hover:bg-primary-50/50",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                "active:scale-[0.99]",
                // Default state
                !isSelected && !showResult && "border-neutral-200 bg-white",
                // Selected state (before result)
                isSelected && !showResult && "border-primary-500 bg-primary-50",
                // Correct answer (after result)
                showCorrect && "border-success-500 bg-success-50",
                // Wrong answer (after result)
                showWrong && "border-error-500 bg-error-50",
                // Disabled state
                disabled && "cursor-not-allowed opacity-90 hover:border-neutral-200 hover:bg-white"
              )}
            >
              <div className="flex items-center gap-4">
                {/* Option Letter */}
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                    !isSelected && !showResult && "bg-neutral-100 text-neutral-600",
                    isSelected && !showResult && "bg-primary-600 text-white",
                    showCorrect && "bg-success-600 text-white",
                    showWrong && "bg-error-600 text-white"
                  )}
                >
                  {String.fromCharCode(65 + index)}
                </span>

                {/* Option Text */}
                <span
                  className={cn(
                    "flex-1 text-base",
                    showCorrect && "font-medium text-success-700",
                    showWrong && "text-error-700",
                    !showResult && "text-neutral-900"
                  )}
                >
                  {option}
                </span>

                {/* Result Indicator */}
                {showCorrect && (
                  <span className="text-sm font-medium text-success-600">
                    Correct
                  </span>
                )}
                {showWrong && (
                  <span className="text-sm font-medium text-error-600">
                    Your answer
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
