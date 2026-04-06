"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Timer, TimerOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { QuestionCard } from "@/components/practice/question-card";
import { FeedbackCard } from "@/components/practice/feedback-card";
import { PracticeTimer } from "@/components/practice/practice-timer";
import { SessionSummary } from "@/components/practice/session-summary";
import { mockQuestions } from "@/lib/mock-data";

type PracticeState = "practicing" | "feedback" | "summary";

interface SessionResult {
  questionId: string;
  isCorrect: boolean;
  subject: string;
  topic: string;
}

export default function PracticePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [practiceState, setPracticeState] = useState<PracticeState>("practicing");
  const [results, setResults] = useState<SessionResult[]>([]);
  const [mistakesLogged, setMistakesLogged] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [timerEnabled, setTimerEnabled] = useState(false);

  const questions = mockQuestions;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  // Track session time
  useEffect(() => {
    if (practiceState === "summary") return;
    
    const interval = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [practiceState]);

  const handleSelectAnswer = (index: number) => {
    if (practiceState !== "practicing") return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setResults((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        isCorrect,
        subject: currentQuestion.subject,
        topic: currentQuestion.topic,
      },
    ]);

    setPracticeState("feedback");
  };

  const handleLogMistake = () => {
    setMistakesLogged((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentIndex === totalQuestions - 1) {
      // End of session
      setPracticeState("summary");
    } else {
      // Move to next question
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setPracticeState("practicing");
    }
  };

  const handlePracticeAgain = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setPracticeState("practicing");
    setResults([]);
    setMistakesLogged(0);
    setSessionTime(0);
  }, []);

  const correctAnswers = results.filter((r) => r.isCorrect).length;
  const isCorrect =
    practiceState === "feedback" &&
    selectedAnswer === currentQuestion?.correctAnswer;

  if (practiceState === "summary") {
    return (
      <div className="mx-auto max-w-4xl py-8">
        <SessionSummary
          totalQuestions={totalQuestions}
          correctAnswers={correctAnswers}
          timeTaken={sessionTime}
          results={results}
          mistakesLogged={mistakesLogged}
          onPracticeAgain={handlePracticeAgain}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Dashboard</span>
            </Link>
          </Button>
          <div>
            <h1 className="font-[var(--font-poppins)] text-xl font-bold text-neutral-900">
              Practice Session
            </h1>
            <p className="text-sm text-neutral-500">
              Question {currentIndex + 1} of {totalQuestions}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Timer Toggle */}
          <Button
            variant={timerEnabled ? "secondary" : "outline"}
            size="sm"
            onClick={() => setTimerEnabled(!timerEnabled)}
          >
            {timerEnabled ? (
              <>
                <Timer className="mr-2 h-4 w-4" />
                Timer On
              </>
            ) : (
              <>
                <TimerOff className="mr-2 h-4 w-4" />
                Timer Off
              </>
            )}
          </Button>

          {/* Timer Display */}
          {timerEnabled && (
            <PracticeTimer
              initialSeconds={60}
              isActive={practiceState === "practicing"}
              onTimeUp={handleSubmit}
              mode="countdown"
            />
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-neutral-500">Progress</span>
          <div className="flex items-center gap-2">
            <Badge variant="success">{correctAnswers} correct</Badge>
            <Badge variant="error">{results.length - correctAnswers} wrong</Badge>
          </div>
        </div>
        <Progress value={progress} size="md" />
      </div>

      {/* Question or Feedback */}
      {practiceState === "practicing" && (
        <>
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
            showResult={false}
            disabled={false}
          />

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="min-w-[200px]"
            >
              Submit Answer
            </Button>
          </div>
        </>
      )}

      {practiceState === "feedback" && selectedAnswer !== null && (
        <>
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={() => {}}
            showResult={true}
            disabled={true}
          />

          <div className="mt-6">
            <FeedbackCard
              question={currentQuestion}
              userAnswer={selectedAnswer}
              isCorrect={isCorrect}
              onNext={handleNext}
              onLogMistake={handleLogMistake}
              isLastQuestion={currentIndex === totalQuestions - 1}
            />
          </div>
        </>
      )}
    </div>
  );
}
