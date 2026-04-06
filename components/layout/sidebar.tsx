"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Target,
  AlertCircle,
  BarChart3,
  CreditCard,
  Settings,
  Flame,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Practice", href: "/practice", icon: Target },
  { label: "Mistakes", href: "/mistakes", icon: AlertCircle, badge: 5 },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

const secondaryNavItems: NavItem[] = [
  { label: "Pricing", href: "/pricing", icon: CreditCard },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  streak?: number;
  isPremium?: boolean;
}

export function Sidebar({ streak = 0, isPremium = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-neutral-200 bg-white">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-neutral-200 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
            <Target className="h-5 w-5 text-white" />
          </div>
          <span className="font-[var(--font-poppins)] text-xl font-bold text-neutral-900">
            ScoreBoost
          </span>
        </div>

        {/* Streak Banner */}
        {streak > 0 && (
          <div className="mx-4 mt-4 flex items-center gap-3 rounded-lg bg-gradient-to-r from-warning-50 to-warning-100 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning-500">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                {streak} Day Streak!
              </p>
              <p className="text-xs text-neutral-600">Keep it going</p>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <nav className="mt-6 flex-1 space-y-1 px-3">
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-neutral-400">
            Main
          </p>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary-50 text-primary-700"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5",
                        isActive ? "text-primary-600" : "text-neutral-400"
                      )}
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge variant="error" className="h-5 min-w-5 justify-center">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="hidden">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}

          <div className="my-4 border-t border-neutral-200" />

          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-neutral-400">
            Account
          </p>
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive ? "text-primary-600" : "text-neutral-400"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Premium Upgrade Card */}
        {!isPremium && (
          <div className="m-4 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 p-4 text-white">
            <div className="mb-2 flex items-center gap-2">
              <Crown className="h-5 w-5" />
              <span className="font-semibold">Go Premium</span>
            </div>
            <p className="mb-3 text-sm text-primary-100">
              Unlock unlimited practice, full analytics, and personalised plans.
            </p>
            <Link
              href="/pricing"
              className="inline-flex w-full items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-50"
            >
              Upgrade Now
            </Link>
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
}
