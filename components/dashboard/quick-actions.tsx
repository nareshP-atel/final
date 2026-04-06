"use client";

import Link from "next/link";
import { Target, AlertCircle, BarChart3, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAction {
  label: string;
  href: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const actions: QuickAction[] = [
  {
    label: "Practice Now",
    href: "/practice",
    icon: Target,
    color: "text-primary-600",
    bgColor: "bg-primary-50 hover:bg-primary-100",
  },
  {
    label: "Review Mistakes",
    href: "/mistakes",
    icon: AlertCircle,
    color: "text-error-600",
    bgColor: "bg-error-50 hover:bg-error-100",
  },
  {
    label: "Check Analytics",
    href: "/analytics",
    icon: BarChart3,
    color: "text-success-600",
    bgColor: "bg-success-50 hover:bg-success-100",
  },
  {
    label: "Study Notes",
    href: "/notes",
    icon: BookOpen,
    color: "text-warning-600",
    bgColor: "bg-warning-50 hover:bg-warning-100",
  },
];

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
            action.bgColor,
            action.color
          )}
        >
          <action.icon className="h-4 w-4" />
          {action.label}
        </Link>
      ))}
    </div>
  );
}
