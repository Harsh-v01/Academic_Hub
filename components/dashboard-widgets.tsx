"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import useSWR from "swr"
import Link from "next/link"

const fetcher = (key: string) => {
  // simple mock data by route key
  if (key === "recent-summaries") {
    return [
      {
        id: "1",
        title: "Operating Systems - Deadlocks",
        date: "Sep 23",
        snippet: "Deadlock prevention and avoidance strategies…",
      },
      { id: "2", title: "DBMS - Normalization", date: "Sep 20", snippet: "1NF, 2NF, 3NF and BCNF differences…" },
      { id: "3", title: "Networks - TCP vs UDP", date: "Sep 18", snippet: "Reliability vs latency trade-offs…" },
    ]
  }
  if (key === "upcoming-quizzes") {
    return [
      { id: "q1", title: "Algorithms Quiz", due: "Tomorrow", progress: 40 },
      { id: "q2", title: "OS Concepts", due: "Mon", progress: 10 },
    ]
  }
  if (key === "saved") {
    return [
      { id: "s1", kind: "Summary", title: "Compiler Design - Lexing" },
      { id: "s2", kind: "PYQ", title: "DBMS 2022 Set B" },
      { id: "s3", kind: "Quiz", title: "CN Fundamentals" },
    ]
  }
  return []
}

export function QuickUploadWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="border-2 border-dashed rounded-lg p-6 text-center bg-muted">
          <p className="text-sm text-muted-foreground">Drag & drop documents here</p>
          <p className="text-xs text-muted-foreground">PDF, DOCX, PPT up to 10MB</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <Input type="file" aria-label="Upload documents" className="max-w-xs" />
            <Link href="/upload">
              <Button variant="secondary">Go to Upload</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function RecentSummariesWidget() {
  const { data = [] } = useSWR("recent-summaries", fetcher, { fallbackData: [] })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Summaries</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((s: any) => (
          <div key={s.id} className="rounded-md p-3 bg-card border">
            <div className="flex items-center justify-between">
              <div className="font-medium">{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.date}</div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{s.snippet}</p>
          </div>
        ))}
        <Link href="/summaries">
          <Button variant="link" className="px-0">
            View all summaries
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export function UpcomingQuizzesWidget() {
  const { data = [] } = useSWR("upcoming-quizzes", fetcher, { fallbackData: [] })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Quiz Reminders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((q: any) => (
          <div key={q.id}>
            <div className="flex items-center justify-between">
              <div className="font-medium">{q.title}</div>
              <div className="text-xs text-muted-foreground">{q.due}</div>
            </div>
            <Progress value={q.progress} className="mt-2" />
          </div>
        ))}
        <Link href="/quizzes">
          <Button variant="link" className="px-0">
            Open quizzes
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export function SavedResourcesWidget() {
  const { data = [] } = useSWR("saved", fetcher, { fallbackData: [] })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Resources</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {data.map((r: any) => (
          <div key={r.id} className="flex items-center justify-between rounded-md border p-3">
            <div>
              <div className="text-xs text-muted-foreground">{r.kind}</div>
              <div className="font-medium">{r.title}</div>
            </div>
            <Button size="sm" variant="outline">
              Open
            </Button>
          </div>
        ))}
        <Link href="/saved">
          <Button variant="link" className="px-0">
            Manage saved
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
