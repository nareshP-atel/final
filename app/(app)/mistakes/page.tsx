"use client";

import { useState, useMemo } from "react";
import {
  AlertCircle,
  Filter,
  Search,
  SlidersHorizontal,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MistakeCard } from "@/components/mistakes/mistake-card";
import { mockMistakes } from "@/lib/mock-data";
import type { Mistake } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type FilterType = "all" | "unresolved" | "resolved";
type MistakeType = "all" | "conceptual" | "careless" | "repeated" | "needs-revision";

export default function MistakesPage() {
  const [mistakes, setMistakes] = useState<Mistake[]>(mockMistakes);
  const [filterStatus, setFilterStatus] = useState<FilterType>("all");
  const [filterType, setFilterType] = useState<MistakeType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMistakes = useMemo(() => {
    return mistakes.filter((mistake) => {
      // Status filter
      if (filterStatus === "unresolved" && mistake.isResolved) return false;
      if (filterStatus === "resolved" && !mistake.isResolved) return false;

      // Type filter
      if (filterType !== "all" && mistake.mistakeType !== filterType) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          mistake.question.text.toLowerCase().includes(query) ||
          mistake.question.topic.toLowerCase().includes(query) ||
          mistake.question.subject.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [mistakes, filterStatus, filterType, searchQuery]);

  const handleMarkResolved = (id: string) => {
    setMistakes((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isResolved: true } : m))
    );
  };

  const handleDelete = (id: string) => {
    setMistakes((prev) => prev.filter((m) => m.id !== id));
  };

  const unresolvedCount = mistakes.filter((m) => !m.isResolved).length;
  const repeatedCount = mistakes.filter((m) => m.mistakeType === "repeated").length;

  const statusFilters: { value: FilterType; label: string; count?: number }[] = [
    { value: "all", label: "All", count: mistakes.length },
    { value: "unresolved", label: "Unresolved", count: unresolvedCount },
    { value: "resolved", label: "Resolved", count: mistakes.length - unresolvedCount },
  ];

  const typeFilters: { value: MistakeType; label: string }[] = [
    { value: "all", label: "All Types" },
    { value: "conceptual", label: "Conceptual" },
    { value: "careless", label: "Careless" },
    { value: "repeated", label: "Repeated" },
    { value: "needs-revision", label: "Needs Revision" },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-[var(--font-poppins)] text-2xl font-bold text-neutral-900">
            Mistake Tracker
          </h1>
          <p className="text-neutral-500">
            Learn from your mistakes to improve your scores
          </p>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-3">
          <Badge variant="error" className="px-3 py-1.5">
            <AlertCircle className="mr-1.5 h-4 w-4" />
            {unresolvedCount} unresolved
          </Badge>
          {repeatedCount > 0 && (
            <Badge variant="warning" className="px-3 py-1.5">
              {repeatedCount} repeated
            </Badge>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search mistakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Status Filter */}
              <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-1">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setFilterStatus(filter.value)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                      filterStatus === filter.value
                        ? "bg-white text-neutral-900 shadow-sm"
                        : "text-neutral-600 hover:text-neutral-900"
                    )}
                  >
                    {filter.label}
                    {filter.count !== undefined && (
                      <span className="text-xs text-neutral-400">
                        ({filter.count})
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Type Filter Dropdown */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as MistakeType)}
                className="h-10 rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-700 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
              >
                {typeFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mistakes List */}
      {filteredMistakes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success-100">
              <CheckCircle className="h-6 w-6 text-success-600" />
            </div>
            <h3 className="mb-1 font-semibold text-neutral-900">
              No mistakes found
            </h3>
            <p className="text-sm text-neutral-500">
              {filterStatus !== "all" || filterType !== "all"
                ? "Try adjusting your filters"
                : "Keep practicing to track your mistakes!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map((mistake) => (
            <MistakeCard
              key={mistake.id}
              mistake={mistake}
              onPracticeAgain={() => {
                // Navigate to practice with this question
                window.location.href = "/practice";
              }}
              onMarkResolved={() => handleMarkResolved(mistake.id)}
              onDelete={() => handleDelete(mistake.id)}
            />
          ))}
        </div>
      )}

      {/* Summary Footer */}
      {filteredMistakes.length > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-neutral-100 px-4 py-3 text-sm">
          <span className="text-neutral-600">
            Showing {filteredMistakes.length} of {mistakes.length} mistakes
          </span>
          <Button variant="secondary" size="sm">
            Export Mistakes
          </Button>
        </div>
      )}
    </div>
  );
}
