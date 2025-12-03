import type { Metadata } from "next"
import { ServiceCard } from "@/components/service-card"
import { PageHero } from "@/components/page-hero"
import services from "@/content/services.json"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive dental services in Juja including teeth whitening, dental implants, braces, veneers, and smile makeovers by Dr. Ken Walibora.",
  keywords: ["dental services Juja", "teeth whitening Juja", "dental implants Juja", "braces Juja", "veneers Juja"],
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Dental Services"
        description="From routine care to complete smile transformations, we offer comprehensive dental services tailored to your needs."
        imageSrc="/modern-dental-clinic-interior-with-blue-lighting-p.jpg"
      />

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                shortDescription={service.shortDescription}
                icon={service.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
