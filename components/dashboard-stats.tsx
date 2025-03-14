"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Percent, Flame, PieChart, TrendingUp, Award } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function DashboardStats() {
  // This would normally come from your database
  const mockData = {
    completedDays: 15,
    totalDays: 30,
    streak: 5,
    monthlyProgress: [
      { month: "Jan", completed: 20, goal: 25 },
      { month: "Feb", completed: 15, goal: 25 },
      { month: "Mar", completed: 25, goal: 25 },
      { month: "Apr", completed: 18, goal: 25 },
      { month: "May", completed: 22, goal: 25 },
      { month: "Jun", completed: 30, goal: 25 },
    ],
    weeklyProgress: [
      { day: "Mon", completed: 3 },
      { day: "Tue", completed: 4 },
      { day: "Wed", completed: 2 },
      { day: "Thu", completed: 5 },
      { day: "Fri", completed: 3 },
      { day: "Sat", completed: 1 },
      { day: "Sun", completed: 4 },
    ],
    habitCategories: [
      { name: "Exercise", count: 10 },
      { name: "Reading", count: 8 },
      { name: "Meditation", count: 12 },
      { name: "Coding", count: 15 },
    ],
  }

  const completionRate = Math.round((mockData.completedDays / mockData.totalDays) * 100)
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full md:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 flex items-center">
            <Percent className="mr-2 h-5 w-5" />
            Completion Rate
          </CardTitle>
          <CardDescription>Your overall completion rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="relative h-24 w-24">
              <svg className="h-24 w-24" viewBox="0 0 100 100">
                <circle
                  className="text-muted stroke-current"
                  strokeWidth="10"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <>
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <circle
                    stroke="url(#progressGradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    strokeDasharray={`${completionRate * 2.51} 251`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                </>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{completionRate}%</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {mockData.completedDays} of {mockData.totalDays} days completed
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 flex items-center">
            <Flame className="mr-2 h-5 w-5" />
            Current Streak
          </CardTitle>
          <CardDescription>Days in a row</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              {mockData.streak}
            </div>
            <div className="mt-2 text-muted-foreground">days in a row</div>
            <div className="mt-4 flex">
              {[...Array(Math.min(mockData.streak, 7))].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full mx-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Monthly Progress
          </CardTitle>
          <CardDescription>Completed days per month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[220px] w-full">
            <div className="grid grid-cols-6 gap-2 h-full">
              {mockData.monthlyProgress.map((item) => {
                const percentage = Math.round((item.completed / item.goal) * 100)
                const isHovered = hoveredMonth === item.month
                const isCompleted = item.completed >= item.goal

                return (
                  <div
                    key={item.month}
                    className="flex flex-col items-center justify-end h-full"
                    onMouseEnter={() => setHoveredMonth(item.month)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  >
                    <div className="relative w-full flex flex-col items-center justify-end h-[80%]">
                      {/* Goal line */}
                      <div
                        className="absolute w-full border-t-2 border-dashed border-gray-300 dark:border-gray-600"
                        style={{ bottom: `${(item.goal / 31) * 100}%` }}
                      >
                        {isHovered && (
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">
                            Goal: {item.goal}
                          </span>
                        )}
                      </div>

                      {/* Progress bar */}
                      <div
                        className={cn(
                          "w-full rounded-t-lg transition-all duration-500 relative group cursor-pointer",
                          isCompleted
                            ? "bg-gradient-to-t from-green-500 to-green-400 dark:from-green-700 dark:to-green-600"
                            : "bg-gradient-to-t from-purple-600 to-pink-500 dark:from-purple-700 dark:to-pink-600",
                        )}
                        style={{
                          height: `${Math.max(5, (item.completed / 31) * 100)}%`,
                          minHeight: "4px",
                          maxWidth: isHovered ? "100%" : "70%",
                          marginLeft: isHovered ? "0" : "15%",
                        }}
                      >
                        {/* Completion badge */}
                        {isCompleted && (
                          <div className="absolute -top-2 -right-2 bg-green-500 dark:bg-green-600 rounded-full p-0.5 shadow-lg">
                            <Award className="h-3 w-3 text-white" />
                          </div>
                        )}

                        {/* Hover tooltip */}
                        <div
                          className={cn(
                            "absolute -top-10 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-md px-2 py-1 text-xs font-medium transition-opacity",
                            isHovered ? "opacity-100" : "opacity-0 pointer-events-none",
                          )}
                        >
                          <div className="text-center">{item.completed} days</div>
                          <div className="text-center text-xs text-muted-foreground">{percentage}% of goal</div>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800"></div>
                        </div>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "mt-2 text-xs font-medium transition-colors",
                        isHovered ? "text-purple-600 dark:text-purple-400" : "text-muted-foreground",
                      )}
                    >
                      {item.month}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Weekly Progress
          </CardTitle>
          <CardDescription>Completed habits per day this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.weeklyProgress}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="url(#colorCompleted)"
                  strokeWidth={3}
                  dot={{ stroke: "#9333ea", strokeWidth: 2, r: 4, fill: "white" }}
                  activeDot={{ r: 6, stroke: "#ec4899", strokeWidth: 2, fill: "white" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 flex items-center">
            <PieChart className="mr-2 h-5 w-5" />
            Habit Categories
          </CardTitle>
          <CardDescription>Distribution of your habits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockData.habitCategories.map((category) => (
              <div key={category.name} className="flex items-center">
                <div className="w-24 truncate">{category.name}</div>
                <div className="flex-1 ml-2">
                  <div className="h-2 bg-muted rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{
                        width: `${(category.count / Math.max(...mockData.habitCategories.map((c) => c.count))) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="w-8 text-right">{category.count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

