import { ServiceCard } from "./service-card"
import services from "@/content/services.json"

export function ServicesGrid() {
  return (
    <section className="py-16 lg:py-24 bg-dental-deep" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 id="services-heading" className="text-3xl font-semibold text-white sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-white/60">Comprehensive dental care tailored to your needs</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
  )
}
