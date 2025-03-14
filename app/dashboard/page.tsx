import { DashboardStats } from "@/components/dashboard-stats"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
        Dashboard
      </h2>
      <DashboardStats />
    </div>
  )
}

