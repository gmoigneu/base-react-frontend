import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"

export function DashboardPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">423</div>
            <p className="text-xs text-gray-500">
              +12.3% from last hour
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 