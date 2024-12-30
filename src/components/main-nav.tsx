import { cn } from "@/lib/utils"
import { Link } from "react-router"
import { HomeIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { PackageIcon } from 'lucide-react'
interface MainNavProps {
  className?: string
}

const navigationItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: HomeIcon,
    },
    {
      title: "Products",
      href: "/products",
      icon: PackageIcon,
    },
    {
      title: "Configuration",
      href: "/configuration",
      icon: MixerHorizontalIcon,
    }
  ]

export function MainNav({ className }: MainNavProps) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {navigationItems.map((item) => (
        <Link key={item.href}
          to={item.href}
          className="text-sm font-medium transition-colors hover:text-black"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
} 