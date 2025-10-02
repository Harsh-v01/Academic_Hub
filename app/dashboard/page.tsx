import AppShell from "@/components/app-shell"
import {
  QuickUploadWidget,
  RecentSummariesWidget,
  UpcomingQuizzesWidget,
  SavedResourcesWidget,
} from "@/components/dashboard-widgets"

export default function DashboardPage() {
  return (
    <AppShell>
      <section aria-labelledby="dashboard-title" className="space-y-6">
        <header>
          <h2 id="dashboard-title" className="text-2xl font-semibold">
            Dashboard
          </h2>
          <p className="text-muted-foreground">Quick access to uploads, summaries, quizzes, and saved content.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1 md:col-span-2">
            <QuickUploadWidget />
          </div>
          <div className="lg:col-span-1">
            <RecentSummariesWidget />
          </div>
          <div className="lg:col-span-1">
            <UpcomingQuizzesWidget />
          </div>
          <div className="lg:col-span-3">
            <SavedResourcesWidget />
          </div>
        </div>
      </section>
    </AppShell>
  )
}
