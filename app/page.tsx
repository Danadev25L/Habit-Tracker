
import { DashboardStats } from "@/components/dashboard-stats"

export default function Home() {
  return (
    <div className="container mx-auto py-6 px-4 min-h-screen bg-gradient-to-b from-background to-background/50">
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 pb-2">
        Habit Tracker
      </h1>


          <DashboardStats />

    </div>
  )
}

