"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Mouse as House, Upload, FileText, HelpCircle, CheckSquare, Star, User, Settings, Search } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import MobileNav from "./mobile-nav"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: House },
  { href: "/upload", label: "Upload Docs", icon: Upload },
  { href: "/summaries", label: "Summaries", icon: FileText },
  { href: "/pyq", label: "PYQs", icon: HelpCircle },
  { href: "/quizzes", label: "Quizzes", icon: CheckSquare },
  { href: "/saved", label: "Saved", icon: Star },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-dvh grid lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col border-r bg-sidebar p-4 gap-2">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="size-9 rounded-lg bg-primary text-primary-foreground grid place-items-center font-semibold">
            AI
          </div>
          <span className="font-semibold">Academic Hub</span>
        </Link>
        <nav className="mt-4 flex-1">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = pathname?.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      active ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Student Hub</div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 border-b bg-background">
        <div className="flex items-center gap-2 p-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <span className="sr-only">Open menu</span>
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-4 border-b flex items-center gap-2">
                <div className="size-9 rounded-lg bg-primary text-primary-foreground grid place-items-center font-semibold">
                  AI
                </div>
                <span className="font-semibold">Academic Hub</span>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const active = pathname?.startsWith(item.href)
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                            active
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-accent hover:text-accent-foreground",
                          )}
                        >
                          <Icon className="size-4" />
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="font-semibold">Academic Hub</div>
        </div>
      </div>

      {/* Main content column */}
      <main className="flex flex-col">
        {/* Top search */}
        <div className="sticky top-0 z-30 hidden lg:block border-b bg-background">
          <div className="flex items-center gap-2 p-4">
            <div className="relative w-full max-w-2xl">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search across notes, summaries, questions…"
                className="pl-9"
                aria-label="Search across notes, summaries, questions"
              />
            </div>
            <Button variant="secondary">Search</Button>
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  )
}
