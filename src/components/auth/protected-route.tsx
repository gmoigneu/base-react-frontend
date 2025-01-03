import { Navigate, useLocation } from "react-router-dom"
import { Outlet } from "react-router";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()

  const email = localStorage.getItem('email')
  
  if (!email) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children || <Outlet />
} 