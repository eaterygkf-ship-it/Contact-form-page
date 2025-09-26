import RepSubmissionForm from "@/components/rep-submission-form"

export default function Page() {
  return (
    <main className="container mx-auto max-w-2xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-pretty">Representative Submission</h1>
        <p className="text-sm text-muted-foreground">Please fill out the details below and submit the form.</p>
      </header>

      <RepSubmissionForm />
    </main>
  )
}
