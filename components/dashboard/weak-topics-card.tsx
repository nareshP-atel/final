"use client";

import Link from "next/link";
import { ArrowRight, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TopicStrength } from "@/lib/mock-data";

interface WeakTopicsCardProps {
  topics: TopicStrength[];
}

const subjectColors: Record<string, string> = {
  Mathematics: "text-primary-600",
  Science: "text-success-600",
  English: "text-warning-600",
};

function getStrengthColor(strength: number): string {
  if (strength >= 70) return "bg-success-500";
  if (strength >= 50) return "bg-warning-500";
  return "bg-error-500";
}

function getStrengthLabel(strength: number): string {
  if (strength >= 70) return "Strong";
  if (strength >= 50) return "Moderate";
  return "Weak";
}

export function WeakTopicsCard({ topics }: WeakTopicsCardProps) {
  // Sort by strength (ascending) and take top 3 weakest
  const weakestTopics = [...topics]
    .sort((a, b) => a.strength - b.strength)
    .slice(0, 3);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-error-600" />
          Weak Topics
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/analytics" className="text-primary-600">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {weakestTopics.map((topic) => (
          <div key={topic.topic} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={cn("text-sm font-medium", subjectColors[topic.subject])}>
                  {topic.subject.slice(0, 4)}
                </span>
                <span className="text-sm font-medium text-neutral-900">
                  {topic.topic}
                </span>
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  topic.strength < 50 ? "text-error-600" : "text-neutral-500"
                )}
              >
                {getStrengthLabel(topic.strength)} ({topic.strength}%)
              </span>
            </div>
            <Progress
              value={topic.strength}
              size="sm"
              indicatorClassName={getStrengthColor(topic.strength)}
            />
            <p className="text-xs text-neutral-500">
              {topic.correctAnswers}/{topic.questionsAttempted} correct
            </p>
          </div>
        ))}

        <Button variant="secondary" className="w-full" asChild>
          <Link href="/practice?focus=weak">
            Practice Weak Topics
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
