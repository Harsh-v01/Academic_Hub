"use client"

import AppShell from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"
  return (
    <AppShell>
      <section className="space-y-6">
        <header>
          <h2 className="text-2xl font-semibold">Settings</h2>
          <p className="text-muted-foreground">Theme, notifications, and account.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark mode</Label>
            <Switch
              id="dark-mode"
              checked={isDark}
              onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
              aria-label="Toggle dark mode"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Email and push preferences (coming soon)</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Update email, password, and connected services (coming soon)
          </CardContent>
        </Card>
      </section>
    </AppShell>
  )
}
