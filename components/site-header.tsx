"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const nav = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/upload", label: "Upload" },
    { href: "/summaries", label: "Summaries" },
    { href: "/pyq", label: "PYQs" },
    { href: "/quizzes", label: "Quizzes" },
    { href: "/saved", label: "Saved" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="container h-16 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
          <div className="h-6 w-6 rounded-md bg-primary" aria-hidden />
          <span className="font-semibold tracking-tight">Student Hub</span>
        </Link>

        <nav className="ml-2 hidden md:flex items-center gap-2" aria-label="Main">
          {nav.map((item) => {
            const active = pathname?.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-sm",
                  active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <Input placeholder="Search topics, notes, quizzes" className="w-[220px] md:w-[320px]" aria-label="Search" />
          </div>
          <Button asChild className="bg-primary text-primary-foreground hover:opacity-95">
            <Link href="/upload">Upload Notes</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
