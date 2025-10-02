"use client"

import AppShell from "@/components/app-shell"
import PYQFilters from "@/components/pyq-filters"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"

const questions = [
  {
    id: "1",
    subject: "dbms",
    year: "2023",
    difficulty: "medium",
    q: "Explain 2PL protocol",
    a: "Two-Phase Locking ensures serializability by growing and shrinking phases.",
  },
  {
    id: "2",
    subject: "cn",
    year: "2022",
    difficulty: "easy",
    q: "Difference between TCP and UDP",
    a: "TCP is reliable and connection-oriented; UDP is faster and connectionless.",
  },
  {
    id: "3",
    subject: "os",
    year: "2024",
    difficulty: "hard",
    q: "Deadlock necessary conditions",
    a: "Mutual exclusion, hold and wait, no preemption, circular wait.",
  },
]

export default function PYQPage() {
  const [filters, setFilters] = useState<{ subject?: string; year?: string; difficulty?: string }>({})
  const filtered = questions.filter(
    (x) =>
      (!filters.subject || x.subject === filters.subject) &&
      (!filters.year || x.year === filters.year) &&
      (!filters.difficulty || x.difficulty === filters.difficulty),
  )

  return (
    <AppShell>
      <section className="space-y-6">
        <header>
          <h2 className="text-2xl font-semibold">Previous Year Questions</h2>
          <p className="text-muted-foreground">Filter by subject, year, and difficulty. Expand to preview answers.</p>
        </header>

        <PYQFilters onChange={(part) => setFilters({ ...filters, ...part })} />

        <div className="grid gap-3">
          <Accordion type="multiple" className="w-full">
            {filtered.map((q) => (
              <AccordionItem key={q.id} value={q.id}>
                <AccordionTrigger className="text-left">{q.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">{q.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </AppShell>
  )
}
