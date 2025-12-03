"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import testimonials from "@/content/testimonials.json"
import { cn } from "@/lib/utils"

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section
      className="py-16 lg:py-24 bg-gradient-to-b from-dental-deep via-dental-primary/20 to-dental-deep"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 id="testimonials-heading" className="text-center text-3xl font-semibold text-white sm:text-4xl">
          What Our Patients Say
        </h2>

        <div className="mt-12 relative">
          <div className="rounded-2xl glass-strong p-8 shadow-glow md:p-12">
            {/* Stars */}
            <div className="flex justify-center gap-1" aria-label={`${currentTestimonial.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < currentTestimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-white/30",
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mt-6 text-center">
              <p className="text-lg leading-relaxed text-white/90 md:text-xl">
                &ldquo;{currentTestimonial.text}&rdquo;
              </p>
            </blockquote>

            {/* Author */}
            <div className="mt-6 flex flex-col items-center">
              <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-dental-glow/30">
                <Image
                  src={currentTestimonial.image || "/placeholder.svg"}
                  alt=""
                  fill
                  className="object-cover"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center">
                <cite className="not-italic font-semibold text-white">{currentTestimonial.name}</cite>
                <p className="text-sm text-white/60">
                  {currentTestimonial.location} • {currentTestimonial.service}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="text-white hover:bg-white/10 focus-ring"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentIndex(index)
                  }}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all focus-ring",
                    index === currentIndex ? "w-6 bg-dental-glow" : "bg-white/40 hover:bg-white/60",
                  )}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="text-white hover:bg-white/10 focus-ring"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
