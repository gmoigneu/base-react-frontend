import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { useNavigate } from "react-router"

export function ConfigurationPage() {
  const navigate = useNavigate()

  const items = [
    {
      title: "Models",
      href: "/configuration/models",
      description: "Configure your models and their settings.",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Configuration</h2>
      <div className="grid gap-4 md:grid-cols-2 cursor-pointer">
        {items.map((item) => (
          <Card key={item.title} onClick={() => navigate(item.href)}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 