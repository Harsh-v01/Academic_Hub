"use client"

import AppShell from "@/components/app-shell"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

const fetcher = () => [
  { id: "1", kind: "Summary", title: "OS - Scheduling" },
  { id: "2", kind: "PYQ", title: "Networks 2023 Set A" },
  { id: "3", kind: "Quiz", title: "DBMS Basics" },
]

export default function SavedPage() {
  const { data = [] } = useSWR("saved-page", fetcher, { fallbackData: [] })
  return (
    <AppShell>
      <section className="space-y-6">
        <header>
          <h2 className="text-2xl font-semibold">Saved Resources</h2>
          <p className="text-muted-foreground">Pinned summaries, quizzes, and PYQs for quick access.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((r: any) => (
            <Card key={r.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{r.title}</CardTitle>
                <div className="text-xs text-muted-foreground">{r.kind}</div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <Button size="sm" variant="outline">
                  Open
                </Button>
                <Button size="icon" variant="ghost" aria-label="Unsave">
                  <Star className="size-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  )
}
