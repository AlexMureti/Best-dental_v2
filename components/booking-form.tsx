"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Loader2 } from "lucide-react"
import services from "@/content/services.json"

interface FormData {
  name: string
  phone: string
  service: string
  date: string
  message: string
}

interface FormErrors {
  name?: string
  phone?: string
  service?: string
  date?: string
}

const PHONE_REGEX = /^\+?[1-9]\d{7,14}$/

export function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else {
      const cleanPhone = formData.phone.replace(/[\s-]/g, "")
      if (!PHONE_REGEX.test(cleanPhone)) {
        newErrors.phone = "Please enter a valid phone number (e.g., +254712345678)"
      }
    }

    if (!formData.service) {
      newErrors.service = "Please select a service"
    }

    if (!formData.date) {
      newErrors.date = "Please select a preferred date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!validateForm()) return
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.ok) {
        setIsSuccess(true)
        setWhatsappUrl(data.whatsappUrl)
        setFormData({ name: "", phone: "", service: "", date: "", message: "" })
      } else {
        setSubmitError(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      setSubmitError("Failed to submit. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const today = new Date().toISOString().split("T")[0]

  if (isSuccess) {
    return (
      <div className="rounded-2xl glass-strong p-8 shadow-glow text-center" role="alert" aria-live="polite">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-dental-mint" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">Booking Request Sent!</h3>
        <p className="mt-2 text-white/60">
          We&apos;ve received your request. Our team will contact you within 24 hours to confirm your appointment.
        </p>
        {whatsappUrl && (
          <div className="mt-6">
            <p className="text-sm text-white/60 mb-3">Want a faster response?</p>
            <Button asChild className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Message us on WhatsApp
              </a>
            </Button>
          </div>
        )}
        <Button
          variant="outline"
          className="mt-4 rounded-2xl border-white/20 text-white hover:bg-white/10 bg-transparent"
          onClick={() => setIsSuccess(false)}
        >
          Book Another Appointment
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl glass-strong p-6 shadow-glow sm:p-8" noValidate>
      <h3 className="text-xl font-semibold text-white">Book Your Appointment</h3>
      <p className="mt-1 text-sm text-white/60">Fill in your details and we&apos;ll get back to you.</p>

      {submitError && (
        <div
          className="mt-4 rounded-lg bg-destructive/20 border border-destructive/30 p-3 text-sm text-red-300"
          role="alert"
          aria-live="assertive"
        >
          {submitError}
        </div>
      )}

      <div className="mt-6 space-y-5">
        {/* Name Field */}
        <div>
          <Label htmlFor="name" className="text-white">
            Full Name <span className="text-red-400">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`mt-1.5 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/40 ${errors.name ? "border-red-400" : ""}`}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <Label htmlFor="phone" className="text-white">
            Phone (WhatsApp) <span className="text-red-400">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+254712345678"
            className={`mt-1.5 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/40 ${errors.phone ? "border-red-400" : ""}`}
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
          />
          <p id="phone-hint" className="mt-1 text-xs text-white/50">
            We&apos;ll use this to confirm your appointment via WhatsApp
          </p>
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-sm text-red-400" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Service Select */}
        <div>
          <Label htmlFor="service" className="text-white">
            Service <span className="text-red-400">*</span>
          </Label>
          <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
            <SelectTrigger
              id="service"
              className={`mt-1.5 rounded-xl bg-white/10 border-white/20 text-white ${errors.service ? "border-red-400" : ""}`}
              aria-required="true"
              aria-invalid={!!errors.service}
            >
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent className="bg-dental-deep border-white/20">
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id} className="text-white hover:bg-white/10">
                  {service.title}
                </SelectItem>
              ))}
              <SelectItem value="consultation" className="text-white hover:bg-white/10">
                General Consultation
              </SelectItem>
              <SelectItem value="other" className="text-white hover:bg-white/10">
                Other
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.service && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.service}
            </p>
          )}
        </div>

        {/* Date Field */}
        <div>
          <Label htmlFor="date" className="text-white">
            Preferred Date <span className="text-red-400">*</span>
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            min={today}
            className={`mt-1.5 rounded-xl bg-white/10 border-white/20 text-white ${errors.date ? "border-red-400" : ""}`}
            aria-required="true"
            aria-invalid={!!errors.date}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.date}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <Label htmlFor="message" className="text-white">
            Additional Notes (Optional)
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            rows={3}
            className="mt-1.5 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/40 resize-none"
            placeholder="Any specific concerns or questions?"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-dental-secondary hover:bg-dental-secondary/90 text-white rounded-2xl py-6 text-base font-medium transition-all hover:scale-[1.01] hover:shadow-glow focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            "Request Appointment"
          )}
        </Button>
      </div>
    </form>
  )
}
