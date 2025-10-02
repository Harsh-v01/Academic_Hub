"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import ResultsChart from "./results-chart"

type Q = { id: string; prompt: string; options: string[]; answer: number; topic: string }

const questions: Q[] = [
  {
    id: "1",
    prompt: "TCP ensures:",
    options: ["Best-effort delivery", "Reliable ordered delivery", "No congestion", "No retransmissions"],
    answer: 1,
    topic: "Networks",
  },
  { id: "2", prompt: "BCNF is stronger than:", options: ["1NF", "2NF", "3NF", "4NF"], answer: 2, topic: "DBMS" },
  {
    id: "3",
    prompt: "Deadlock requires:",
    options: ["Preemption", "No circular wait", "Mutual exclusion", "Infinite resources"],
    answer: 2,
    topic: "OS",
  },
]

export default function QuizRunner() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [done, setDone] = useState(false)
  const progress = Math.round((index / questions.length) * 100)

  const select = (i: number) => {
    const next = [...answers]
    next[index] = i
    setAnswers(next)
  }

  const nextQ = () => {
    if (index + 1 < questions.length) setIndex(index + 1)
    else setDone(true)
  }

  useEffect(() => {
    if (done) {
      // Try a lightweight confetti effect if available
      ;(async () => {
        try {
          const confetti = (await import("canvas-confetti")).default
          confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } })
        } catch {}
      })()
    }
  }, [done])

  if (done) {
    const correct = answers.reduce((acc, a, i) => acc + (a === questions[i].answer ? 1 : 0), 0)
    const byTopic = new Map<string, { total: number; correct: number }>()
    questions.forEach((q, i) => {
      const stats = byTopic.get(q.topic) || { total: 0, correct: 0 }
      stats.total += 1
      stats.correct += answers[i] === q.answer ? 1 : 0
      byTopic.set(q.topic, stats)
    })
    const chartData = Array.from(byTopic.entries()).map(([label, s]) => ({
      label,
      value: Math.round((s.correct / s.total) * 100),
    }))

    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              Score:{" "}
              <span className="font-semibold">
                {correct} / {questions.length}
              </span>
            </div>
            <div className="text-sm">Great job! Review weaker areas below.</div>
          </CardContent>
        </Card>
        <ResultsChart results={chartData} />
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setIndex(0)
              setAnswers([])
              setDone(false)
            }}
          >
            Retry
          </Button>
          <Button variant="secondary">Save Result</Button>
        </div>
      </div>
    )
  }

  const q = questions[index]
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Question {index + 1} of {questions.length}
          </div>
          <div className="w-40">
            <Progress value={progress} aria-label="Quiz progress" />
          </div>
        </div>
        <div className="font-medium">{q.prompt}</div>
        <div className="grid gap-2">
          {q.options.map((o, i) => (
            <Button
              key={i}
              variant={answers[index] === i ? "default" : "outline"}
              className={answers[index] === i ? "bg-accent text-accent-foreground" : ""}
              onClick={() => select(i)}
            >
              {o}
            </Button>
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={nextQ} disabled={answers[index] == null}>
            {index + 1 === questions.length ? "Finish" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
