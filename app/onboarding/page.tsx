"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Target, ArrowRight, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type OnboardingStep = "welcome" | "class" | "subjects" | "assessment" | "results";

const classes = [6, 7, 8, 9, 10];
const subjects = [
  { id: "math", name: "Mathematics", icon: "+" },
  { id: "science", name: "Science", icon: "~" },
  { id: "english", name: "English", icon: "A" },
  { id: "social", name: "Social Studies", icon: "G" },
  { id: "hindi", name: "Hindi", icon: "H" },
];

const assessmentQuestions = [
  {
    subject: "Mathematics",
    question: "If x + 5 = 12, what is x?",
    options: ["5", "7", "12", "17"],
    correct: 1,
  },
  {
    subject: "Science",
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "NaCl"],
    correct: 0,
  },
  {
    subject: "Mathematics",
    question: "What is 15% of 200?",
    options: ["15", "20", "30", "35"],
    correct: 2,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [weakTopics, setWeakTopics] = useState<string[]>([]);

  const progress = {
    welcome: 0,
    class: 25,
    subjects: 50,
    assessment: 75,
    results: 100,
  };

  const handleClassSelect = (classNum: number) => {
    setSelectedClass(classNum);
  };

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((s) => s !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Calculate weak topics
      const weak: string[] = [];
      newAnswers.forEach((answer, index) => {
        if (answer !== assessmentQuestions[index].correct) {
          weak.push(assessmentQuestions[index].subject);
        }
      });
      setWeakTopics([...new Set(weak)]);
      setStep("results");
    }
  };

  const handleComplete = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
            <Target className="h-5 w-5 text-white" />
          </div>
          <span className="font-[var(--font-poppins)] text-xl font-bold text-neutral-900">
            ScoreBoost
          </span>
        </div>
        <Progress value={progress[step]} className="w-32" size="sm" />
      </header>

      <main className="mx-auto max-w-xl px-4 py-12">
        {/* Welcome Step */}
        {step === "welcome" && (
          <div className="text-center animate-fade-in">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
              <Target className="h-10 w-10 text-primary-600" />
            </div>
            <h1 className="font-[var(--font-poppins)] text-3xl font-bold text-neutral-900">
              Welcome to ScoreBoost
            </h1>
            <p className="mt-3 text-lg text-neutral-500">
              The AI-powered performance engine that helps you improve your exam
              scores in just 30 minutes a day.
            </p>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-card">
                <CheckCircle className="h-5 w-5 text-success-600" />
                <span className="text-neutral-700">
                  Personalised daily study plans
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-card">
                <CheckCircle className="h-5 w-5 text-success-600" />
                <span className="text-neutral-700">
                  AI-powered mistake tracking
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-card">
                <CheckCircle className="h-5 w-5 text-success-600" />
                <span className="text-neutral-700">
                  Score prediction and analytics
                </span>
              </div>
            </div>
            <Button size="xl" className="mt-8 w-full" onClick={() => setStep("class")}>
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Class Selection Step */}
        {step === "class" && (
          <div className="animate-fade-in">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep("welcome")}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h2 className="font-[var(--font-poppins)] text-2xl font-bold text-neutral-900">
              Which class are you in?
            </h2>
            <p className="mt-2 text-neutral-500">
              We&apos;ll personalise your content based on your class
            </p>
            <div className="mt-8 grid grid-cols-5 gap-3">
              {classes.map((classNum) => (
                <button
                  key={classNum}
                  onClick={() => handleClassSelect(classNum)}
                  className={cn(
                    "flex h-20 items-center justify-center rounded-lg border-2 text-2xl font-bold transition-all",
                    selectedClass === classNum
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-primary-300"
                  )}
                >
                  {classNum}
                </button>
              ))}
            </div>
            <Button
              size="xl"
              className="mt-8 w-full"
              disabled={!selectedClass}
              onClick={() => setStep("subjects")}
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Subject Selection Step */}
        {step === "subjects" && (
          <div className="animate-fade-in">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep("class")}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h2 className="font-[var(--font-poppins)] text-2xl font-bold text-neutral-900">
              Select your subjects
            </h2>
            <p className="mt-2 text-neutral-500">
              Choose the subjects you want to practice
            </p>
            <div className="mt-8 space-y-3">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => handleSubjectToggle(subject.id)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-lg border-2 p-4 transition-all",
                    selectedSubjects.includes(subject.id)
                      ? "border-primary-500 bg-primary-50"
                      : "border-neutral-200 bg-white hover:border-primary-300"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold",
                      selectedSubjects.includes(subject.id)
                        ? "bg-primary-600 text-white"
                        : "bg-neutral-100 text-neutral-600"
                    )}
                  >
                    {subject.icon}
                  </div>
                  <span className="flex-1 text-left font-medium text-neutral-900">
                    {subject.name}
                  </span>
                  {selectedSubjects.includes(subject.id) && (
                    <CheckCircle className="h-5 w-5 text-primary-600" />
                  )}
                </button>
              ))}
            </div>
            <Button
              size="xl"
              className="mt-8 w-full"
              disabled={selectedSubjects.length === 0}
              onClick={() => setStep("assessment")}
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Assessment Step */}
        {step === "assessment" && (
          <div className="animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
              <Badge variant="secondary">
                Question {currentQuestion + 1} of {assessmentQuestions.length}
              </Badge>
              <span className="text-sm text-neutral-500">
                {assessmentQuestions[currentQuestion].subject}
              </span>
            </div>
            <h2 className="font-[var(--font-poppins)] text-xl font-bold text-neutral-900">
              Let&apos;s find your weak spots
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Answer these quick questions to personalise your study plan
            </p>

            <Card className="mt-6">
              <CardContent className="p-6">
                <p className="mb-6 text-lg font-medium text-neutral-900">
                  {assessmentQuestions[currentQuestion].question}
                </p>
                <div className="space-y-3">
                  {assessmentQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="flex w-full items-center gap-4 rounded-lg border-2 border-neutral-200 p-4 text-left transition-all hover:border-primary-300 hover:bg-primary-50"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-600">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-neutral-900">{option}</span>
                      </button>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            <Progress
              value={((currentQuestion + 1) / assessmentQuestions.length) * 100}
              className="mt-6"
              size="sm"
            />
          </div>
        )}

        {/* Results Step */}
        {step === "results" && (
          <div className="text-center animate-fade-in">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
              <Sparkles className="h-10 w-10 text-primary-600" />
            </div>
            <h2 className="font-[var(--font-poppins)] text-2xl font-bold text-neutral-900">
              Here&apos;s where you lose marks
            </h2>
            <p className="mt-2 text-neutral-500">
              We&apos;ve identified your weak topics. Let&apos;s work on them together!
            </p>

            {weakTopics.length > 0 ? (
              <div className="mt-8 space-y-3">
                {weakTopics.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center gap-3 rounded-lg bg-error-50 p-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-error-100">
                      <span className="text-sm font-bold text-error-600">!</span>
                    </div>
                    <span className="font-medium text-error-700">{topic}</span>
                    <Badge variant="error" className="ml-auto">
                      Needs work
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-lg bg-success-50 p-6">
                <CheckCircle className="mx-auto h-8 w-8 text-success-600" />
                <p className="mt-2 font-medium text-success-700">
                  Great job! You got all questions correct.
                </p>
              </div>
            )}

            <div className="mt-8 rounded-lg bg-primary-50 p-4">
              <p className="text-sm text-primary-700">
                Your personalised study plan is ready. We&apos;ll help you improve
                these topics with daily practice.
              </p>
            </div>

            <Button size="xl" className="mt-8 w-full" onClick={handleComplete}>
              Start Your First Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
