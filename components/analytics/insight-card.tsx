"use client";

import { TrendingUp, AlertTriangle, Target, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Insight {
  id: string;
  type: "improvement" | "warning" | "goal";
  message: string;
  subject: string | null;
}

interface InsightCardProps {
  insights: Insight[];
}

const insightConfig = {
  improvement: {
    icon: TrendingUp,
    color: "text-success-600",
    bgColor: "bg-success-50",
    borderColor: "border-success-200",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-warning-600",
    bgColor: "bg-warning-50",
    borderColor: "border-warning-200",
  },
  goal: {
    icon: Target,
    color: "text-primary-600",
    bgColor: "bg-primary-50",
    borderColor: "border-primary-200",
  },
};

const subjectColors: Record<string, string> = {
  Mathematics: "bg-primary-100 text-primary-700",
  Science: "bg-success-100 text-success-700",
  English: "bg-warning-100 text-warning-600",
};

export function InsightCard({ insights }: InsightCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary-600" />
          <h3 className="font-[var(--font-poppins)] font-semibold text-neutral-900">
            Insights
          </h3>
        </div>

        <div className="space-y-3">
          {insights.map((insight) => {
            const config = insightConfig[insight.type];
            const Icon = config.icon;

            return (
              <div
                key={insight.id}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3",
                  config.bgColor,
                  config.borderColor
                )}
              >
                <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", config.color)} />
                <div className="flex-1">
                  <p className="text-sm text-neutral-700">{insight.message}</p>
                  {insight.subject && (
                    <Badge
                      className={cn(
                        "mt-2",
                        subjectColors[insight.subject] || "bg-neutral-100"
                      )}
                    >
                      {insight.subject}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
