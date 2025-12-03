import { Hero } from "@/components/hero"
import { ServicesGrid } from "@/components/services-grid"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { BookingForm } from "@/components/booking-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Clock, Phone } from "lucide-react"

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Services Section */}
      <ServicesGrid />

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-dental-deep" aria-labelledby="why-us-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 id="why-us-heading" className="text-3xl font-semibold text-white sm:text-4xl">
                Why Juja Trusts Best Dental
              </h2>
              <p className="mt-4 text-lg text-white/60 leading-relaxed">
                Dr. Ken Walibora brings over a decade of experience in cosmetic dentistry to Juja. Our clinic combines
                modern technology with personalized care to deliver results that speak for themselves.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Advanced sterilization and safety protocols",
                  "Comfortable, modern clinic environment",
                  "Transparent pricing with no hidden fees",
                  "Flexible payment plans available",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="h-6 w-6 shrink-0 text-dental-glow" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className="mt-8 bg-dental-secondary hover:bg-dental-secondary/90 text-white rounded-2xl px-6"
              >
                <Link href="/about">
                  Meet Dr. Ken Walibora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="rounded-2xl glass-strong p-6 shadow-glow">
              <h3 className="text-xl font-semibold text-white">Visit Our Clinic</h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-dental-glow" />
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <p className="text-white/60">Ken Walibora Road, Juja, Central Kenya</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-dental-glow" />
                  <div>
                    <p className="font-medium text-white">Opening Hours</p>
                    <p className="text-white/60">Mon - Fri: 9:00 AM - 5:00 PM</p>
                    <p className="text-white/60">Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-dental-glow" />
                  <div>
                    <p className="font-medium text-white">Contact</p>
                    <a href="tel:+254724124735" className="text-dental-glow hover:underline">
                      0724 124735
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  asChild
                  className="w-full bg-dental-secondary hover:bg-dental-secondary/90 text-white rounded-2xl"
                >
                  <Link href="/contact">Get Directions</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-dental-deep via-dental-primary/30 to-dental-deep py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Ready to Transform Your Smile?</h2>
              <p className="mt-4 text-lg text-white/60 leading-relaxed">
                Book a consultation with Dr. Ken Walibora and take the first step toward the smile you&apos;ve always
                wanted. We&apos;ll create a personalized treatment plan just for you.
              </p>
              <div className="mt-6 rounded-xl glass p-4">
                <p className="text-sm text-white/70">
                  <strong className="text-white">Same-week appointments available.</strong> We respond to all booking
                  requests within 24 hours.
                </p>
              </div>
            </div>
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  )
}
