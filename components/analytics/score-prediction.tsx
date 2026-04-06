"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ScorePredictionProps {
  min: number;
  max: number;
  current: number;
  previousWeek: number;
  trend: "up" | "down" | "stable";
}

export function ScorePrediction({
  min,
  max,
  current,
  previousWeek,
  trend,
}: ScorePredictionProps) {
  const change = current - previousWeek;
  const percentage = ((current - min) / (100 - min)) * 100;

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-success-600"
      : trend === "down"
        ? "text-error-600"
        : "text-neutral-500";

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <CardTitle className="flex items-center justify-between">
          <span>Score Prediction</span>
          <div className={cn("flex items-center gap-1 text-sm", "text-primary-100")}>
            <TrendIcon className="h-4 w-4" />
            <span>
              {change >= 0 ? "+" : ""}
              {change} from last week
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Gauge Display */}
        <div className="relative mb-6">
          {/* Gauge Background */}
          <div className="mx-auto h-32 w-64 overflow-hidden">
            <div className="relative h-64 w-64 rounded-full border-[16px] border-neutral-200">
              {/* Gauge Fill */}
              <div
                className="absolute inset-0 rounded-full border-[16px] border-transparent"
                style={{
                  borderTopColor: "#4F46E5",
                  borderRightColor: percentage > 50 ? "#4F46E5" : "transparent",
                  transform: `rotate(${45 + (percentage / 100) * 180}deg)`,
                  transition: "transform 0.5s ease-out",
                }}
              />
            </div>
          </div>

          {/* Score Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
            <div className="text-4xl font-bold text-neutral-900">
              {min}–{max}
            </div>
            <p className="text-sm text-neutral-500">Predicted Score</p>
          </div>
        </div>

        {/* Score Range Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">Score Range</span>
            <span className="font-medium text-neutral-900">out of 100</span>
          </div>
          <div className="relative h-4 overflow-hidden rounded-full bg-neutral-200">
            {/* Range indicator */}
            <div
              className="absolute h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500"
              style={{
                left: `${min}%`,
                width: `${max - min}%`,
              }}
            />
            {/* Current score marker */}
            <div
              className="absolute top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-primary-900"
              style={{ left: `${current}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>

        {/* Insight */}
        <div className="mt-4 rounded-lg bg-primary-50 p-3 text-sm text-primary-700">
          <p>
            Based on your practice, you are likely to score{" "}
            <strong>
              {min}–{max}
            </strong>{" "}
            in the next exam. Keep practicing to improve!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
