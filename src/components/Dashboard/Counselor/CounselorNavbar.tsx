"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  Menu, 
  X,
  LogOut,
  User as UserIcon
} from "lucide-react"
import { useUser } from "@stackframe/stack"

interface CounselorNavbarProps {
  counselorName: string
  counselorPhoto?: string
}

export function CounselorNavbar({ counselorName, counselorPhoto }: CounselorNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const user = useUser()

  const navItems = [
    { name: "Dashboard", href: "/counselor-dashboard", icon: LayoutDashboard },
    { name: "Bookings", href: "/counselor-dashboard/bookings", icon: Calendar },
    { name: "Edit Profile", href: "/counselor-dashboard/edit-profile", icon: Settings },
  ]

  const initials = counselorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/counselor-dashboard" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400">
              <span className="text-white font-bold text-lg">CC</span>
            </div>
            <span className="text-xl font-bold text-amber-800">
              Career<span className="text-amber-600">Compass</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-2 transition-all duration-200 ${
                      isActive
                        ? "bg-amber-100 text-amber-800 font-semibold"
                        : "text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-amber-50/50">
              <Avatar className="h-8 w-8 border-2 border-amber-200">
                <AvatarImage src={counselorPhoto} alt={counselorName} />
                <AvatarFallback className="bg-gradient-to-br from-amber-400 to-yellow-400 text-white text-sm font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-amber-900">{counselorName}</span>
            </div>
            
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => user.signOut()}
                className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-amber-700 hover:bg-amber-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-amber-200 bg-white">
          <div className="px-4 py-4 space-y-2">
            {/* User Info */}
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-amber-50 mb-4">
              <Avatar className="h-10 w-10 border-2 border-amber-200">
                <AvatarImage src={counselorPhoto} alt={counselorName} />
                <AvatarFallback className="bg-gradient-to-br from-amber-400 to-yellow-400 text-white font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-amber-900">{counselorName}</span>
            </div>

            {/* Navigation Links */}
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-amber-100 text-amber-800 font-semibold"
                        : "text-amber-700 hover:bg-amber-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </div>
                </Link>
              )
            })}

            {/* Sign Out */}
            {user && (
              <button
                onClick={() => {
                  user.signOut()
                  setIsMenuOpen(false)
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-700 hover:bg-red-50 w-full transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
