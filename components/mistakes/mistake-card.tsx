"use client";

import { useState } from "react";
import {
  AlertCircle,
  Brain,
  RefreshCw,
  Bookmark,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Target,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Mistake } from "@/lib/mock-data";

interface MistakeCardProps {
  mistake: Mistake;
  onPracticeAgain?: () => void;
  onMarkResolved?: () => void;
  onDelete?: () => void;
}

const mistakeTypeConfig = {
  conceptual: {
    label: "Conceptual Gap",
    icon: Brain,
    color: "bg-error-100 text-error-700",
  },
  careless: {
    label: "Careless Error",
    icon: AlertCircle,
    color: "bg-warning-100 text-warning-600",
  },
  repeated: {
    label: "Repeated Mistake",
    icon: RefreshCw,
    color: "bg-error-100 text-error-700 border border-error-300",
  },
  "needs-revision": {
    label: "Needs Revision",
    icon: Bookmark,
    color: "bg-primary-100 text-primary-700",
  },
};

const subjectColors: Record<string, string> = {
  Mathematics: "bg-primary-100 text-primary-700",
  Science: "bg-success-100 text-success-700",
  English: "bg-warning-100 text-warning-600",
};

export function MistakeCard({
  mistake,
  onPracticeAgain,
  onMarkResolved,
  onDelete,
}: MistakeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeConfig = mistakeTypeConfig[mistake.mistakeType];
  const TypeIcon = typeConfig.icon;
  const { question } = mistake;

  const timeAgo = getTimeAgo(mistake.timestamp);

  return (
    <Card
      className={cn(
        "overflow-hidden transition-shadow hover:shadow-elevated",
        mistake.isResolved && "opacity-60"
      )}
    >
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-4">
          <div className="flex-1 space-y-2">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={subjectColors[question.subject] || "bg-neutral-100"}>
                {question.subject}
              </Badge>
              <Badge variant="outline">{question.topic}</Badge>
              <Badge className={typeConfig.color}>
                <TypeIcon className="mr-1 h-3 w-3" />
                {typeConfig.label}
              </Badge>
              {mistake.attempts > 1 && (
                <Badge variant="error">
                  {mistake.attempts}x attempted
                </Badge>
              )}
            </div>

            {/* Question Preview */}
            <p className="line-clamp-2 text-sm font-medium text-neutral-900">
              {question.text}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-3 text-xs text-neutral-500">
              <span>{timeAgo}</span>
              <span>-</span>
              <span className="text-error-600">
                Your answer: {question.options[mistake.userAnswer]}
              </span>
            </div>
          </div>

          {/* Resolved Badge */}
          {mistake.isResolved && (
            <Badge variant="success" className="shrink-0">
              <CheckCircle className="mr-1 h-3 w-3" />
              Resolved
            </Badge>
          )}
        </div>

        {/* Expandable Section */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-center gap-1 border-t border-neutral-100 bg-neutral-50 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100"
        >
          {isExpanded ? (
            <>
              Show less <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Show details <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>

        {isExpanded && (
          <div className="space-y-4 border-t border-neutral-100 p-4 animate-slide-up">
            {/* Full Question */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-400">
                Question
              </p>
              <p className="text-sm text-neutral-900">{question.text}</p>
            </div>

            {/* Answer Comparison */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-error-50 p-3">
                <p className="mb-1 text-xs font-medium text-error-600">
                  Your Answer
                </p>
                <p className="text-sm font-medium text-error-700">
                  {question.options[mistake.userAnswer]}
                </p>
              </div>
              <div className="rounded-lg bg-success-50 p-3">
                <p className="mb-1 text-xs font-medium text-success-600">
                  Correct Answer
                </p>
                <p className="text-sm font-medium text-success-700">
                  {question.options[question.correctAnswer]}
                </p>
              </div>
            </div>

            {/* Explanation */}
            <div className="rounded-lg bg-neutral-50 p-3">
              <p className="mb-1 text-xs font-medium text-neutral-600">
                Explanation
              </p>
              <p className="text-sm leading-relaxed text-neutral-700">
                {question.explanation}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              {onPracticeAgain && !mistake.isResolved && (
                <Button size="sm" onClick={onPracticeAgain}>
                  <Target className="mr-2 h-4 w-4" />
                  Practice Again
                </Button>
              )}
              {onMarkResolved && !mistake.isResolved && (
                <Button size="sm" variant="secondary" onClick={onMarkResolved}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark Resolved
                </Button>
              )}
              {onDelete && (
                <Button size="sm" variant="ghost" onClick={onDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}
