"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, Calendar, Users, BookOpen, Sun, Moon, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: BarChart2, label: "Dashboard", href: "/" },
  { icon: Calendar, label: "Calendar", href: "/calender" },
  { icon: Users, label: "Social", href: "/social" },
  { icon: BookOpen, label: "Training", href: "/training" },
  { icon: Sun, label: "Setting", href: "/profile" },
  
]

export function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <>
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar content */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card text-card-foreground border-r transform transition-transform duration-200 ease-in-out 
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Habit Tracker
            </h1>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      pathname === item.href
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme Toggle - Only Render After Mounting */}
          <div className="p-4 border-t">
            {mounted && (
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full justify-start"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="mr-2 h-5 w-5" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-5 w-5" />
                    Dark Mode
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleMobileMenu} />}
    </>
  )
}
