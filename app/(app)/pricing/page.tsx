"use client";

import { useState } from "react";
import { Check, X, Crown, Zap, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BillingCycle = "monthly" | "annual";

const features = [
  {
    name: "Daily practice questions",
    free: "10/day",
    premium: "Unlimited",
  },
  {
    name: "Mistake Tracker entries",
    free: "20 total",
    premium: "Unlimited",
  },
  {
    name: "AI explanations",
    free: "3/day",
    premium: "Unlimited",
  },
  {
    name: "Analytics",
    free: "Basic (7-day)",
    premium: "Full (30-day + score prediction)",
  },
  {
    name: "Study plan",
    free: "Generic",
    premium: "Personalised adaptive plan",
  },
  {
    name: "Leaderboard",
    free: "View only",
    premium: "Full participation + badges",
  },
  {
    name: "Notes",
    free: "5 notes",
    premium: "Unlimited",
  },
  {
    name: "Books library",
    free: "3 books",
    premium: "Full library",
  },
  {
    name: "Parent dashboard",
    free: false,
    premium: true,
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annual");

  const monthlyPrice = 149;
  const annualPrice = 999;
  const annualMonthlyPrice = Math.round(annualPrice / 12);
  const savings = monthlyPrice * 12 - annualPrice;

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-8">
      {/* Header */}
      <div className="text-center">
        <Badge className="mb-4 bg-primary-100 text-primary-700">
          <Crown className="mr-1 h-3 w-3" />
          Premium Plans
        </Badge>
        <h1 className="font-[var(--font-poppins)] text-3xl font-bold text-neutral-900 md:text-4xl">
          Improve your marks in 30 minutes a day
        </h1>
        <p className="mt-3 text-lg text-neutral-500">
          Less than a cup of chai. More than a tuition fee.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-neutral-100 p-1">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              billingCycle === "monthly"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={cn(
              "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              billingCycle === "annual"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            )}
          >
            Annual
            <Badge variant="success" className="text-xs">
              Save Rs{savings}
            </Badge>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Free Plan */}
        <Card className="relative">
          <CardHeader className="pb-4">
            <div className="mb-2 flex items-center gap-2">
              <Zap className="h-5 w-5 text-neutral-600" />
              <span className="text-lg font-semibold text-neutral-900">Free</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-neutral-900">Rs0</span>
              <span className="text-neutral-500">/month</span>
            </div>
            <p className="mt-2 text-sm text-neutral-500">
              Get started with basic practice features
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Current Plan
            </Button>

            <div className="space-y-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex items-center gap-3">
                  {feature.free === false ? (
                    <X className="h-4 w-4 text-neutral-300" />
                  ) : (
                    <Check className="h-4 w-4 text-success-600" />
                  )}
                  <span className="flex-1 text-sm text-neutral-600">
                    {feature.name}
                  </span>
                  {feature.free !== false && feature.free !== true && (
                    <span className="text-sm font-medium text-neutral-900">
                      {feature.free}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Premium Plan */}
        <Card className="relative border-2 border-primary-200 bg-gradient-to-b from-primary-50/50 to-white">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-primary-600 px-3 py-1 text-white">
              Most Popular
            </Badge>
          </div>
          <CardHeader className="pb-4 pt-6">
            <div className="mb-2 flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary-600" />
              <span className="text-lg font-semibold text-primary-700">
                Premium
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-neutral-900">
                Rs{billingCycle === "annual" ? annualMonthlyPrice : monthlyPrice}
              </span>
              <span className="text-neutral-500">/month</span>
            </div>
            {billingCycle === "annual" && (
              <p className="mt-1 text-sm text-primary-600">
                Billed Rs{annualPrice}/year
              </p>
            )}
            <p className="mt-2 text-sm text-neutral-500">
              Unlock your full potential with all features
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Upgrade to Premium</Button>

            <div className="space-y-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary-600" />
                  <span className="flex-1 text-sm text-neutral-600">
                    {feature.name}
                  </span>
                  {feature.premium !== true && (
                    <span className="text-sm font-medium text-primary-700">
                      {feature.premium}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Proof */}
      <div className="rounded-lg bg-neutral-100 p-6 text-center">
        <div className="flex items-center justify-center gap-2 text-lg font-semibold text-neutral-900">
          <Users className="h-5 w-5 text-primary-600" />
          <span>14,000+ students improved their score last month</span>
        </div>
        <p className="mt-2 text-sm text-neutral-500">
          Join thousands of students who are already boosting their marks
        </p>
      </div>

      {/* FAQ or Trust */}
      <div className="text-center text-sm text-neutral-500">
        <p>
          No credit card required for Free plan. Cancel Premium anytime.
        </p>
        <p className="mt-1">
          Questions? Contact us at{" "}
          <a
            href="mailto:support@scoreboost.in"
            className="text-primary-600 hover:underline"
          >
            support@scoreboost.in
          </a>
        </p>
      </div>
    </div>
  );
}
