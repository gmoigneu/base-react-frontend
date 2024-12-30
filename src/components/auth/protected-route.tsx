import { Navigate, useLocation } from "react-router-dom"
import { ReactNode } from "react"
import { Outlet } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()

  const email = localStorage.getItem('email')
  
  if (!email) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
} 