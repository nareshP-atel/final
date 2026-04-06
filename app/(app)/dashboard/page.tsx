import { StatsGrid } from "@/components/dashboard/stats-grid";
import { StudyPlanCard } from "@/components/dashboard/study-plan-card";
import { WeakTopicsCard } from "@/components/dashboard/weak-topics-card";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { QuickActions } from "@/components/dashboard/quick-actions";
import {
  mockUser,
  mockStudyPlan,
  mockTopicStrengths,
  mockProgressData,
  mockStats,
} from "@/lib/mock-data";
import { getGreeting } from "@/lib/utils";

export default function DashboardPage() {
  const greeting = getGreeting();
  const firstName = mockUser.name.split(" ")[0];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="font-[var(--font-poppins)] text-2xl font-bold text-neutral-900">
          {greeting}, {firstName}!
        </h1>
        <p className="text-neutral-500">
          Ready to boost your scores? Here&apos;s your plan for today.
        </p>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Stats Grid */}
      <StatsGrid
        questionsToday={mockStats.questionsToday}
        accuracyToday={mockStats.accuracyToday}
        mistakesToday={mockStats.mistakesToday}
        streakDays={mockStats.streakDays}
      />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Plan - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <StudyPlanCard topics={mockStudyPlan} />
        </div>

        {/* Weak Topics */}
        <div>
          <WeakTopicsCard topics={mockTopicStrengths} />
        </div>
      </div>

      {/* Progress Chart */}
      <ProgressChart data={mockProgressData} />
    </div>
  );
}
