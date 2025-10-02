import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SummaryCard({
  title,
  date,
  snippet,
}: {
  title: string
  date: string
  snippet: string
}) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        <div className="text-xs text-muted-foreground">{date}</div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">{snippet}</p>
        <div className="mt-auto">
          <Button size="sm" className="bg-secondary text-secondary-foreground hover:opacity-90">
            Expand
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
