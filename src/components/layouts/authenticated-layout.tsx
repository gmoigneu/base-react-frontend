import { useEffect } from "react"
import { MainNav } from "@/components/main-nav.tsx"
import { UserNav } from "@/components/user-nav.tsx"
import { storeService } from "@/lib/services/store-service.ts"
import { Outlet } from "react-router";


export function AuthenticatedLayout() {
  useEffect(() => {
    storeService.populateStore()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <Outlet />
      </main>
    </div>
  )
} 