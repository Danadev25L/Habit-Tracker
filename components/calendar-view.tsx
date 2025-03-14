"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast, Toaster } from "sonner"
import axios from "axios" // Ensure you import axios

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({})

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ]

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const prevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const toggleDayCompletion = (day: number) => {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    setCompletedDays(prev => {
      const updated = { ...prev, [dateKey]: !prev[dateKey] }

      if (updated[dateKey]) {
        toast.success(`You've marked ${monthNames[month]} ${day} as completed.`)
      }

      return updated
    })
  }

  const fetchCompletedDays = async () => {
    try {
      const response = await axios.get("/api/streaks/days") // Fixed to match the backend route
      const completed = response.data.reduce((acc: Record<string, boolean>, date: string) => {
        acc[date] = true
        return acc
      }, {})
      setCompletedDays(completed)
    } catch (error) {
      console.error("Error fetching completed days:", error)
      toast.error("Failed to fetch completed days.")
    }
  }

  useEffect(() => {
    fetchCompletedDays()
  }, [year, month]) // Fetch again when the year/month changes

  const renderCalendarDays = () => {
    const days = []
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    dayNames.forEach(name => {
      days.push(<div key={`header-${name}`} className="text-center font-medium py-2 text-muted-foreground">{name}</div>)
    })

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const isCompleted = completedDays[dateKey]

      days.push(
        <div key={`day-${day}`} className="p-1">
          <Button
            variant="outline"
            className={`w-full h-16 flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
              isCompleted
                ? "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-400 dark:from-purple-900/40 dark:to-pink-900/40 dark:border-purple-700 shadow-md"
                : "hover:bg-muted/50"
            }`}
            onClick={() => toggleDayCompletion(day)}
          >
            <span className={isCompleted ? "font-medium" : ""}>{day}</span>
            {isCompleted ? (
              <Check className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            ) : (
              <X className="h-4 w-4 text-gray-300 dark:text-gray-600" />
            )}
          </Button>
        </div>
      )
    }

    return days
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prevMonth}
            className="rounded-full hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900/30 dark:hover:text-purple-400 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            {monthNames[month]} {year}
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
            className="rounded-full hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900/30 dark:hover:text-purple-400 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
      </CardContent>
      <Toaster />
    </Card>
  )
}
