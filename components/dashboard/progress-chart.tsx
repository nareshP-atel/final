"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import type { ProgressData } from "@/lib/mock-data";

interface ProgressChartProps {
  data: ProgressData[];
}

export function ProgressChart({ data }: ProgressChartProps) {
  const averageAccuracy = Math.round(
    data.reduce((acc, d) => acc + d.accuracy, 0) / data.length
  );
  const latestAccuracy = data[data.length - 1]?.accuracy || 0;
  const previousAccuracy = data[data.length - 2]?.accuracy || latestAccuracy;
  const change = latestAccuracy - previousAccuracy;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary-600" />
            7-Day Progress
          </CardTitle>
          <p className="mt-1 text-sm text-neutral-500">
            Average accuracy: {averageAccuracy}%
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-neutral-900">{latestAccuracy}%</p>
          <p
            className={`text-sm font-medium ${
              change >= 0 ? "text-success-600" : "text-error-600"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change}% from yesterday
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [`${value}%`, "Accuracy"]}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#4F46E5"
                strokeWidth={2.5}
                dot={{ fill: "#4F46E5", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#4F46E5", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
