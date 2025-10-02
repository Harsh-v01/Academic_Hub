import AppShell from "@/components/app-shell"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfilePage() {
  return (
    <AppShell>
      <section className="space-y-6">
        <header>
          <h2 className="text-2xl font-semibold">Profile</h2>
          <p className="text-muted-foreground">Your info and progress.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Student</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Image
              src="/placeholder-user.jpg"
              alt="Profile picture"
              width={64}
              height={64}
              className="rounded-full border"
            />
            <div>
              <div className="font-medium">Alex Johnson</div>
              <div className="text-sm text-muted-foreground">Final-year CSE</div>
            </div>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  )
}
