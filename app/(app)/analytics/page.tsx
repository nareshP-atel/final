import { ProgressChart } from "@/components/dashboard/progress-chart";
import { ScorePrediction } from "@/components/analytics/score-prediction";
import { TopicStrengthChart } from "@/components/analytics/topic-strength-chart";
import { InsightCard } from "@/components/analytics/insight-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  mockProgressData,
  mockTopicStrengths,
  mockScorePrediction,
  mockInsights,
  mockStats,
  mockUser,
} from "@/lib/mock-data";
import { Target, CheckCircle, Clock, Flame, BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  // Calculate overall stats
  const totalQuestions = mockProgressData.reduce(
    (acc, d) => acc + d.questionsAttempted,
    0
  );
  const averageAccuracy = Math.round(
    mockProgressData.reduce((acc, d) => acc + d.accuracy, 0) /
      mockProgressData.length
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[var(--font-poppins)] text-2xl font-bold text-neutral-900">
          Analytics
        </h1>
        <p className="text-neutral-500">
          Track your progress and identify areas for improvement
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
              <Target className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">
                {mockUser.totalPracticed}
              </p>
              <p className="text-sm text-neutral-500">Total Questions</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success-100">
              <CheckCircle className="h-6 w-6 text-success-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">
                {averageAccuracy}%
              </p>
              <p className="text-sm text-neutral-500">Average Accuracy</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning-100">
              <Flame className="h-6 w-6 text-warning-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">
                {mockUser.streak}
              </p>
              <p className="text-sm text-neutral-500">Day Streak</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100">
              <BarChart3 className="h-6 w-6 text-neutral-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">
                {mockTopicStrengths.length}
              </p>
              <p className="text-sm text-neutral-500">Topics Practiced</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Score Prediction */}
        <div className="lg:col-span-1">
          <ScorePrediction
            min={mockScorePrediction.min}
            max={mockScorePrediction.max}
            current={mockScorePrediction.current}
            previousWeek={mockScorePrediction.previousWeek}
            trend={mockScorePrediction.trend}
          />
        </div>

        {/* Insights */}
        <div className="lg:col-span-2">
          <InsightCard insights={mockInsights} />
        </div>
      </div>

      {/* Progress Chart */}
      <ProgressChart data={mockProgressData} />

      {/* Topic Strength Chart */}
      <TopicStrengthChart data={mockTopicStrengths} />

      {/* Subject Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Mathematics", "Science", "English"].map((subject) => {
              const subjectTopics = mockTopicStrengths.filter(
                (t) => t.subject === subject
              );
              const avgStrength =
                subjectTopics.length > 0
                  ? Math.round(
                      subjectTopics.reduce((acc, t) => acc + t.strength, 0) /
                        subjectTopics.length
                    )
                  : 0;
              const totalAttempted = subjectTopics.reduce(
                (acc, t) => acc + t.questionsAttempted,
                0
              );

              const strengthColor =
                avgStrength >= 70
                  ? "bg-success-100 text-success-700"
                  : avgStrength >= 50
                    ? "bg-warning-100 text-warning-600"
                    : "bg-error-100 text-error-700";

              return (
                <div
                  key={subject}
                  className="rounded-lg border border-neutral-200 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="font-semibold text-neutral-900">{subject}</h4>
                    <Badge className={strengthColor}>{avgStrength}%</Badge>
                  </div>
                  <div className="space-y-1 text-sm text-neutral-500">
                    <p>{subjectTopics.length} topics practiced</p>
                    <p>{totalAttempted} questions attempted</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
