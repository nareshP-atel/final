"use client";

import Link from "next/link";
import { Clock, ArrowRight, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { StudyPlanTopic } from "@/lib/mock-data";

interface StudyPlanCardProps {
  topics: StudyPlanTopic[];
}

const priorityColors = {
  high: "bg-error-100 text-error-700 border-error-200",
  medium: "bg-warning-100 text-warning-600 border-warning-200",
  low: "bg-success-100 text-success-700 border-success-200",
};

const subjectColors: Record<string, string> = {
  Mathematics: "bg-primary-100 text-primary-700",
  Science: "bg-success-100 text-success-700",
  English: "bg-warning-100 text-warning-600",
};

export function StudyPlanCard({ topics }: StudyPlanCardProps) {
  const totalTime = topics.reduce((acc, t) => acc + t.estimatedTime, 0);
  const highPriorityCount = topics.filter((t) => t.priority === "high").length;

  return (
    <Card className="overflow-hidden border-2 border-primary-200 bg-gradient-to-br from-white to-primary-50/30">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Zap className="h-5 w-5 text-primary-600" />
              Today&apos;s Plan
            </CardTitle>
            <p className="mt-1 text-sm text-neutral-500">
              {topics.length} topics to master
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-600">
            <Clock className="h-4 w-4" />
            <span className="font-medium">~{totalTime} min</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Topic Pills */}
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5",
                priorityColors[topic.priority]
              )}
            >
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-xs font-medium",
                  subjectColors[topic.subject] || "bg-neutral-100 text-neutral-600"
                )}
              >
                {topic.subject.slice(0, 4)}
              </span>
              <span className="text-sm font-medium">{topic.topic}</span>
              {topic.mistakeCount > 2 && (
                <Badge variant="error" className="h-5 min-w-5 justify-center p-0 text-xs">
                  {topic.mistakeCount}
                </Badge>
              )}
            </div>
          ))}
        </div>

        {/* Priority Alert */}
        {highPriorityCount > 0 && (
          <div className="flex items-center gap-2 rounded-lg bg-error-50 px-3 py-2 text-sm text-error-700">
            <span className="font-medium">{highPriorityCount} high-priority</span>
            <span className="text-error-600">topics need your attention</span>
          </div>
        )}

        {/* CTA */}
        <Button asChild size="lg" className="w-full">
          <Link href="/practice">
            Start Today&apos;s Practice
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
