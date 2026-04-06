"use client";

import { useState } from "react";
import {
  User,
  Bell,
  BookOpen,
  Shield,
  Users,
  LogOut,
  ChevronRight,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { mockUser } from "@/lib/mock-data";

type SettingsTab = "account" | "subjects" | "notifications" | "privacy" | "parent";

const tabs = [
  { id: "account" as const, label: "Account", icon: User },
  { id: "subjects" as const, label: "Subjects & Class", icon: BookOpen },
  { id: "notifications" as const, label: "Notifications", icon: Bell },
  { id: "privacy" as const, label: "Privacy", icon: Shield },
  { id: "parent" as const, label: "Parent Dashboard", icon: Users },
];

const subjects = [
  { id: "math", name: "Mathematics", enabled: true },
  { id: "science", name: "Science", enabled: true },
  { id: "english", name: "English", enabled: true },
  { id: "social", name: "Social Studies", enabled: false },
  { id: "hindi", name: "Hindi", enabled: false },
];

const notifications = [
  { id: "daily", label: "Daily study reminders", enabled: true },
  { id: "streak", label: "Streak alerts", enabled: true },
  { id: "progress", label: "Weekly progress reports", enabled: true },
  { id: "tips", label: "Study tips and insights", enabled: false },
  { id: "promo", label: "Promotional offers", enabled: false },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");
  const [userSubjects, setUserSubjects] = useState(subjects);
  const [userNotifications, setUserNotifications] = useState(notifications);

  const toggleSubject = (id: string) => {
    setUserSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const toggleNotification = (id: string) => {
    setUserNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[var(--font-poppins)] text-2xl font-bold text-neutral-900">
          Settings
        </h1>
        <p className="text-neutral-500">Manage your account and preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      activeTab === tab.id
                        ? "bg-primary-50 text-primary-700"
                        : "text-neutral-600 hover:bg-neutral-100"
                    )}
                  >
                    <tab.icon
                      className={cn(
                        "h-5 w-5",
                        activeTab === tab.id
                          ? "text-primary-600"
                          : "text-neutral-400"
                      )}
                    />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {/* Account Tab */}
          {activeTab === "account" && (
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="" alt={mockUser.name} />
                    <AvatarFallback className="text-lg">
                      {mockUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-neutral-900">
                      {mockUser.name}
                    </h3>
                    <p className="text-sm text-neutral-500">{mockUser.email}</p>
                    <Badge variant="secondary" className="mt-1">
                      Class {mockUser.class} - {mockUser.board}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Edit Profile
                  </Button>
                </div>

                <div className="border-t border-neutral-200 pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-neutral-900">Full Name</p>
                        <p className="text-sm text-neutral-500">{mockUser.name}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-neutral-900">Email</p>
                        <p className="text-sm text-neutral-500">{mockUser.email}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-neutral-900">Password</p>
                        <p className="text-sm text-neutral-500">Last changed 30 days ago</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-neutral-200 pt-6">
                  <Button variant="ghost" className="text-error-600 hover:bg-error-50 hover:text-error-700">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Subjects Tab */}
          {activeTab === "subjects" && (
            <Card>
              <CardHeader>
                <CardTitle>Subjects & Class</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-neutral-700">
                    Current Class
                  </label>
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    {[6, 7, 8, 9, 10].map((classNum) => (
                      <button
                        key={classNum}
                        className={cn(
                          "rounded-lg border-2 py-3 text-center font-semibold transition-colors",
                          mockUser.class === classNum
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-neutral-200 text-neutral-600 hover:border-primary-300"
                        )}
                      >
                        Class {classNum}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-neutral-200 pt-6">
                  <label className="text-sm font-medium text-neutral-700">
                    Active Subjects
                  </label>
                  <div className="mt-3 space-y-2">
                    {userSubjects.map((subject) => (
                      <button
                        key={subject.id}
                        onClick={() => toggleSubject(subject.id)}
                        className="flex w-full items-center justify-between rounded-lg border border-neutral-200 p-3 transition-colors hover:bg-neutral-50"
                      >
                        <span className="font-medium text-neutral-900">
                          {subject.name}
                        </span>
                        <div
                          className={cn(
                            "flex h-6 w-11 items-center rounded-full p-1 transition-colors",
                            subject.enabled ? "bg-primary-600" : "bg-neutral-200"
                          )}
                        >
                          <div
                            className={cn(
                              "h-4 w-4 rounded-full bg-white transition-transform",
                              subject.enabled && "translate-x-5"
                            )}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userNotifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => toggleNotification(notification.id)}
                    className="flex w-full items-center justify-between rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50"
                  >
                    <span className="font-medium text-neutral-900">
                      {notification.label}
                    </span>
                    <div
                      className={cn(
                        "flex h-6 w-11 items-center rounded-full p-1 transition-colors",
                        notification.enabled ? "bg-primary-600" : "bg-neutral-200"
                      )}
                    >
                      <div
                        className={cn(
                          "h-4 w-4 rounded-full bg-white transition-transform",
                          notification.enabled && "translate-x-5"
                        )}
                      />
                    </div>
                  </button>
                ))}

                <div className="rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">
                  <p>
                    We&apos;ll send notifications via push and email. You can manage
                    email preferences separately.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
                  <div>
                    <p className="font-medium text-neutral-900">
                      Show on Leaderboard
                    </p>
                    <p className="text-sm text-neutral-500">
                      Allow others to see your rank and stats
                    </p>
                  </div>
                  <div className="flex h-6 w-11 items-center rounded-full bg-primary-600 p-1">
                    <div className="h-4 w-4 translate-x-5 rounded-full bg-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
                  <div>
                    <p className="font-medium text-neutral-900">
                      Share Progress with School
                    </p>
                    <p className="text-sm text-neutral-500">
                      If your school uses ScoreBoost
                    </p>
                  </div>
                  <div className="flex h-6 w-11 items-center rounded-full bg-neutral-200 p-1">
                    <div className="h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>

                <div className="border-t border-neutral-200 pt-4">
                  <Button variant="ghost" className="text-error-600">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Parent Dashboard Tab */}
          {activeTab === "parent" && (
            <Card>
              <CardHeader>
                <CardTitle>Parent Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!mockUser.isPremium ? (
                  <div className="rounded-lg bg-warning-50 p-6 text-center">
                    <Users className="mx-auto mb-3 h-10 w-10 text-warning-500" />
                    <h3 className="font-semibold text-neutral-900">
                      Premium Feature
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600">
                      Upgrade to Premium to link a parent account and share
                      weekly progress reports.
                    </p>
                    <Button className="mt-4">Upgrade to Premium</Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
                      <div>
                        <p className="font-medium text-neutral-900">
                          Linked Parent Email
                        </p>
                        <p className="text-sm text-neutral-500">
                          parent@example.com
                        </p>
                      </div>
                      <Badge variant="success">
                        <Check className="mr-1 h-3 w-3" />
                        Linked
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
                      <div>
                        <p className="font-medium text-neutral-900">
                          Weekly Progress Reports
                        </p>
                        <p className="text-sm text-neutral-500">
                          Send weekly email summaries
                        </p>
                      </div>
                      <div className="flex h-6 w-11 items-center rounded-full bg-primary-600 p-1">
                        <div className="h-4 w-4 translate-x-5 rounded-full bg-white" />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
