"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroProps {
  headline?: string
  subheadline?: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
}

export function Hero({
  headline = "Precision Dentistry. Confident Smiles.",
  subheadline = "Dr. Ken Walibora and our team deliver expert cosmetic dental care in Juja — from teeth whitening to complete smile makeovers.",
  primaryCta = { text: "Book Consultation", href: "/contact" },
  secondaryCta = { text: "View Services", href: "/services" },
}: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="/dental-clinic-modern-interior.jpg"
        >
          <source
            src="https://videos.pexels.com/video-files/6129528/6129528-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-dental-deep/80 via-dental-deep/60 to-transparent" />
        {/* Accent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dental-primary/20 via-transparent to-transparent" />
      </div>

      {/* Video control button */}
      <button
        onClick={toggleVideo}
        className="absolute bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all hover:bg-white/30 focus-ring"
        aria-label={isVideoPlaying ? "Pause video" : "Play video"}
      >
        {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </button>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-2xl">
          <div
            className={cn(
              "transition-all duration-700 ease-[cubic-bezier(0.22,0.9,0.32,1)]",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-dental-glow/20 backdrop-blur-sm px-4 py-2 text-sm text-dental-glow">
              <span className="h-2 w-2 rounded-full bg-dental-mint animate-pulse" />
              Now accepting new patients in Juja
            </div>

            <h1
              id="hero-heading"
              className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {headline}
            </h1>

            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">{subheadline}</p>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-dental-mint" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>10+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-dental-mint" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>1000+ Happy Patients</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-dental-mint" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Modern Equipment</span>
              </div>
            </div>

            {/* CTAs */}
            <div
              className={cn(
                "mt-10 flex flex-wrap gap-4 transition-all delay-100 duration-700 ease-[cubic-bezier(0.22,0.9,0.32,1)]",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-dental-primary hover:bg-dental-glow rounded-2xl px-8 py-6 text-base font-medium shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] focus-ring"
              >
                <Link href={primaryCta.href}>
                  <Calendar className="mr-2 h-5 w-5" />
                  {primaryCta.text}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 rounded-2xl px-8 py-6 text-base font-medium transition-all hover:scale-[1.02] focus-ring bg-white/5 backdrop-blur-sm"
              >
                <Link href={secondaryCta.href}>
                  {secondaryCta.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating stats card */}
        <div
          className={cn(
            "absolute bottom-8 right-8 hidden lg:block transition-all delay-300 duration-700 ease-[cubic-bezier(0.22,0.9,0.32,1)]",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-semibold text-white">98%</p>
                <p className="text-xs text-white/60">Patient Satisfaction</p>
              </div>
              <div className="h-12 w-px bg-white/20" />
              <div className="text-center">
                <p className="text-3xl font-semibold text-white">5000+</p>
                <p className="text-xs text-white/60">Smiles Transformed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
