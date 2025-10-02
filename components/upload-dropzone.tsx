"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function UploadDropzone() {
  const [progress, setProgress] = useState<number>(0)
  const [processing, setProcessing] = useState<boolean>(false)

  const onDrop = useCallback(() => {
    setProcessing(true)
    setProgress(10)
    const steps = [25, 45, 70, 85, 100]
    steps.forEach((v, i) => setTimeout(() => setProgress(v), 600 * (i + 1)))
    setTimeout(() => setProcessing(false), 3600)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload & Processing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          role="button"
          tabIndex={0}
          onClick={onDrop}
          onKeyDown={(e) => e.key === "Enter" && onDrop()}
          className="border-2 border-dashed rounded-xl p-10 text-center bg-muted cursor-pointer"
          aria-label="Drag and drop documents or click to upload"
        >
          <p className="font-medium">Drag-and-drop documents</p>
          <p className="text-sm text-muted-foreground">or click to select files</p>
        </div>

        {processing && (
          <div className="space-y-2">
            <div className="text-sm">AI is preparing your summary…</div>
            <Progress value={progress} />
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="secondary" onClick={onDrop}>
            Simulate Upload
          </Button>
          <Button variant="outline">Choose Files</Button>
        </div>
      </CardContent>
    </Card>
  )
}
