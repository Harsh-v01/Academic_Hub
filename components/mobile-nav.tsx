"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Mouse as House, Upload, FileText, CheckSquare, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { href: "/dashboard", label: "Home", icon: House },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/summaries", label: "Summaries", icon: FileText },
  { href: "/quizzes", label: "Quizzes", icon: CheckSquare },
  { href: "/saved", label: "Saved", icon: Star },
]

export default function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 border-t bg-background z-40">
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon
          const active = pathname?.startsWith(item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 text-xs",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
                aria-label={item.label}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
