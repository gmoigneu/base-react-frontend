import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GuestLayout } from "@/components/layouts/guest-layout"
import { Label } from "@/components/ui/label"
import { authService } from "@/lib/api/auth-service"
import { useNavigate } from "react-router"

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    const email = event.target.email.value
    const password = event.target.password.value

    authService.login({ email, password }).then(() => {
      navigate('/')
    }).catch((error) => {
      setIsLoading(false)
      setError(error.message)
      console.error(error)
    })
  }

  return (
    <GuestLayout>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500">
          Enter your credentials to access your account
        </p>
      </div>
      {error && <div className="text-center my-4 text-red-500">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4 mt-8">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
          />
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </GuestLayout>
  )
} 