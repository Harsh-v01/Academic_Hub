"use client"

import AppShell from "@/components/app-shell"
import { SummaryCard } from "@/components/summary-card"
import useSWR from "swr"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const fetcher = () => [
  {
    id: "1",
    title: "OS - Memory Management",
    date: "Sep 12",
    content: "• Paging vs Segmentation...\n• Demand paging...\n• Thrashing...",
  },
  {
    id: "2",
    title: "DBMS - Transactions",
    date: "Sep 10",
    content: "• ACID properties...\n• Two-phase locking...\n• Deadlock handling...",
  },
  {
    id: "3",
    title: "CN - Routing",
    date: "Sep 07",
    content: "• Distance vector vs Link state...\n• OSPF basics...\n• BGP overview...",
  },
  {
    id: "4",
    title: "SE - SDLC Models",
    date: "Sep 05",
    content: "• Waterfall, Agile, Spiral...\n• Pros/cons...\n• Use-cases...",
  },
]

export default function SummariesPage() {
  const { data = [] } = useSWR("summaries", fetcher, { fallbackData: [] })

  return (
    <AppShell>
      <section className="space-y-6">
        <header>
          <h2 className="text-2xl font-semibold">Summaries</h2>
          <p className="text-muted-foreground">Card-based view of your uploaded documents and summaries.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((s: any) => (
            <Dialog key={s.id}>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <SummaryCard title={s.title} date={s.date} snippet={s.content.slice(0, 80) + "…"} />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{s.title}</DialogTitle>
                </DialogHeader>
                <article className="prose prose-sm dark:prose-invert">
                  <h4>Summary</h4>
                  <pre className="whitespace-pre-wrap">{s.content}</pre>
                </article>
                <div className="flex gap-2">
                  <Button variant="outline">Download</Button>
                  <Button className="bg-secondary text-secondary-foreground hover:opacity-90">Export</Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>
    </AppShell>
  )
}
