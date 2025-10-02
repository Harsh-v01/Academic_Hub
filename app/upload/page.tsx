import AppShell from "@/components/app-shell"
import UploadDropzone from "@/components/upload-dropzone"

export default function UploadPage() {
  return (
    <AppShell>
      <section className="space-y-6">
        <header>
          <h2 className="text-2xl font-semibold">Upload Documents</h2>
          <p className="text-muted-foreground">Upload notes and get AI-powered summaries.</p>
        </header>
        <UploadDropzone />
      </section>
    </AppShell>
  )
}
