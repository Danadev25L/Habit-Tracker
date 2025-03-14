import { CalendarView } from "@/components/calendar-view"

export default function CalendarPage() {
  return (
    <div className="py-6">
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
        Calendar
      </h2>
      <CalendarView />
    </div>
  )
}

