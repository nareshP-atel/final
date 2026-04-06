"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TopicStrength } from "@/lib/mock-data";

interface TopicStrengthChartProps {
  data: TopicStrength[];
}

function getStrengthColor(strength: number): string {
  if (strength >= 70) return "#16A34A"; // success-600
  if (strength >= 50) return "#EAB308"; // warning-500
  return "#DC2626"; // error-600
}

function getStrengthLabel(strength: number): string {
  if (strength >= 70) return "Strong";
  if (strength >= 50) return "Moderate";
  return "Weak";
}

export function TopicStrengthChart({ data }: TopicStrengthChartProps) {
  // Sort by strength (ascending to show weakest first)
  const sortedData = [...data].sort((a, b) => a.strength - b.strength);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Strength</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              layout="vertical"
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis
                type="number"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis
                type="category"
                dataKey="topic"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#374151", fontSize: 12 }}
                width={120}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number, name: string, props: { payload: TopicStrength }) => [
                  `${value}% (${props.payload.correctAnswers}/${props.payload.questionsAttempted} correct)`,
                  "Strength",
                ]}
                labelFormatter={(label) => `Topic: ${label}`}
              />
              <Bar dataKey="strength" radius={[0, 4, 4, 0]} barSize={24}>
                {sortedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getStrengthColor(entry.strength)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-success-600" />
            <span className="text-sm text-neutral-600">Strong (70%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-warning-500" />
            <span className="text-sm text-neutral-600">Moderate (50-69%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-error-600" />
            <span className="text-sm text-neutral-600">Weak (&lt;50%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
