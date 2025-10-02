"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PYQFilters({
  onChange,
}: {
  onChange: (filters: { subject?: string; year?: string; difficulty?: string }) => void
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Select onValueChange={(v) => onChange({ subject: v })}>
        <SelectTrigger aria-label="Subject">
          <SelectValue placeholder="Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cn">Computer Networks</SelectItem>
          <SelectItem value="dbms">DBMS</SelectItem>
          <SelectItem value="os">Operating Systems</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(v) => onChange({ year: v })}>
        <SelectTrigger aria-label="Year">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(v) => onChange({ difficulty: v })}>
        <SelectTrigger aria-label="Difficulty">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
