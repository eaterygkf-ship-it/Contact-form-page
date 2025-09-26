"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type FormState = "idle" | "submitting" | "success" | "error"

export default function RepSubmissionForm() {
  const [status, setStatus] = useState<FormState>("idle")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = Object.fromEntries(data.entries())

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }

      if (!res.ok || !result?.ok) {
        throw new Error(result?.error || "Request failed")
      }

      setStatus("success")
      form.reset()
      alert("Submitted! Please check your email — Your Appointment has been booked.")
    } catch (err) {
      console.error("[v0] Form submission error:", (err as Error).message)
      setStatus("error")
      alert((err as Error).message || "Something went wrong. Please try again.")
    } finally {
      setStatus("idle")
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="repName">Rep Name</Label>
        <Input
          id="repName"
          name="repName"
          placeholder="Enter representative's name"
          required
          aria-required="true"
          autoComplete="name"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          name="companyName"
          placeholder="Enter company name"
          required
          aria-required="true"
          autoComplete="organization"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          inputMode="tel"
          placeholder="e.g., +1 555 123 4567"
          required
          aria-required="true"
          autoComplete="tel"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="mailId">Mail ID</Label>
        <Input
          id="mailId"
          name="mailId"
          type="email"
          placeholder="name@example.com"
          required
          aria-required="true"
          autoComplete="email"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="doctorName">Doctor&apos;s Name</Label>
        {/* Using a native select for reliability */}
        <select
          id="doctorName"
          name="doctorName"
          required
          aria-required="true"
          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          defaultValue=""
        >
          <option value="" disabled>
            Select a doctor
          </option>
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Johnson">Dr. Johnson</option>
          <option value="Dr. Lee">Dr. Lee</option>
          <option value="Dr. Patel">Dr. Patel</option>
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" type="date" required aria-required="true" />
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={status === "submitting"} className="w-full">
          {status === "submitting" ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  )
}
