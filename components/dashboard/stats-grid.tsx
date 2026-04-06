"use client";

import { Target, CheckCircle, AlertCircle, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  change?: { value: number; label: string };
}

interface StatsGridProps {
  questionsToday: number;
  accuracyToday: number;
  mistakesToday: number;
  streakDays: number;
}

export function StatsGrid({
  questionsToday,
  accuracyToday,
  mistakesToday,
  streakDays,
}: StatsGridProps) {
  const stats: Stat[] = [
    {
      label: "Questions Today",
      value: questionsToday,
      icon: Target,
      color: "text-primary-600",
      bgColor: "bg-primary-100",
    },
    {
      label: "Today's Accuracy",
      value: `${accuracyToday}%`,
      icon: CheckCircle,
      color: "text-success-600",
      bgColor: "bg-success-100",
    },
    {
      label: "Mistakes Today",
      value: mistakesToday,
      icon: AlertCircle,
      color: "text-error-600",
      bgColor: "bg-error-100",
    },
    {
      label: "Day Streak",
      value: streakDays,
      icon: Flame,
      color: "text-warning-500",
      bgColor: "bg-warning-100",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="relative overflow-hidden">
          <CardContent className="flex items-center gap-4 p-4">
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", stat.bgColor)}>
              <stat.icon className={cn("h-6 w-6", stat.color)} />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
              <p className="text-sm text-neutral-500">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
