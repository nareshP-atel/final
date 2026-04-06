"use client";

import { useEffect, useState } from "react";
import { Clock, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/utils";

interface PracticeTimerProps {
  initialSeconds?: number;
  isActive: boolean;
  onTimeUp?: () => void;
  mode?: "countdown" | "stopwatch";
}

export function PracticeTimer({
  initialSeconds = 60,
  isActive,
  onTimeUp,
  mode = "countdown",
}: PracticeTimerProps) {
  const [seconds, setSeconds] = useState(
    mode === "countdown" ? initialSeconds : 0
  );
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isActive || isPaused) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (mode === "countdown") {
          if (prev <= 1) {
            clearInterval(interval);
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPaused, mode, onTimeUp]);

  useEffect(() => {
    // Reset timer when initialSeconds changes (new question)
    if (mode === "countdown") {
      setSeconds(initialSeconds);
    }
  }, [initialSeconds, mode]);

  const progress =
    mode === "countdown" ? (seconds / initialSeconds) * 100 : 100;
  const isLowTime = mode === "countdown" && seconds <= 10;

  return (
    <div className="flex items-center gap-3">
      {/* Timer Display */}
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg px-4 py-2",
          isLowTime
            ? "bg-error-100 text-error-700"
            : "bg-neutral-100 text-neutral-700"
        )}
      >
        <Clock
          className={cn("h-4 w-4", isLowTime && "animate-pulse")}
        />
        <span
          className={cn(
            "font-mono text-lg font-semibold tabular-nums",
            isLowTime && "text-error-600"
          )}
        >
          {formatTime(seconds)}
        </span>
      </div>

      {/* Progress Bar (for countdown) */}
      {mode === "countdown" && (
        <div className="h-2 w-24 overflow-hidden rounded-full bg-neutral-200">
          <div
            className={cn(
              "h-full transition-all duration-1000 ease-linear",
              isLowTime ? "bg-error-500" : "bg-primary-500"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Pause/Play Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsPaused(!isPaused)}
        className="h-8 w-8"
      >
        {isPaused ? (
          <Play className="h-4 w-4" />
        ) : (
          <Pause className="h-4 w-4" />
        )}
        <span className="sr-only">{isPaused ? "Resume" : "Pause"}</span>
      </Button>
    </div>
  );
}
