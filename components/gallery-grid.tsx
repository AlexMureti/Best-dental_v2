"use client"

import { useState, useCallback, useEffect, lazy, Suspense } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smile, Wrench, Sparkles, ArrowRight } from "lucide-react"

const Lightbox = lazy(() => import("./lightbox"))

interface GalleryItem {
  id: string
  before: string
  after: string
  title: string
  description: string
}

interface EquipmentItem {
  id: string
  image: string
  title: string
  description: string
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    before: "/gallery-whitening-before.jpg",
    after: "/gallery-whitening-after.jpg",
    title: "Teeth Whitening",
    description: "Professional whitening treatment results",
  },
  {
    id: "2",
    before: "/gallery-braces-before.jpg",
    after: "/gallery-braces-after.jpg",
    title: "Orthodontic Treatment",
    description: "18-month braces treatment",
  },
  {
    id: "3",
    before: "/gallery-veneers-before.jpg",
    after: "/gallery-veneers-after.jpg",
    title: "Dental Veneers",
    description: "Porcelain veneers transformation",
  },
  {
    id: "4",
    before: "/gallery-implant-before.jpg",
    after: "/gallery-implant-after.jpg",
    title: "Dental Implant",
    description: "Single tooth implant restoration",
  },
]

const equipmentItems: EquipmentItem[] = [
  {
    id: "e1",
    image: "/equipment-dental-chair.jpg",
    title: "Digital Dental Chair",
    description: "State-of-the-art ergonomic dental chair with integrated LED lighting",
  },
  {
    id: "e2",
    image: "/equipment-xray.jpg",
    title: "3D Panoramic X-Ray",
    description: "Advanced digital radiography for precise diagnostics",
  },
  {
    id: "e3",
    image: "/equipment-laser.jpg",
    title: "Laser Dentistry System",
    description: "Precision laser for painless treatments and whitening",
  },
  {
    id: "e4",
    image: "/equipment-sterilizer.jpg",
    title: "Autoclave Sterilizer",
    description: "Hospital-grade sterilization for highest hygiene standards",
  },
  {
    id: "e5",
    image: "/equipment-camera.jpg",
    title: "Intraoral Camera",
    description: "High-definition imaging for detailed examination",
  },
  {
    id: "e6",
    image: "/equipment-implant-kit.jpg",
    title: "Implant Surgical Kit",
    description: "Premium titanium instruments for implant procedures",
  },
]

export function GalleryGrid() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState("transformations")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    const elements = document.querySelectorAll("[data-gallery-item]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [activeTab])

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2 mb-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 h-auto">
          <TabsTrigger
            value="transformations"
            className="rounded-xl py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-dental-secondary data-[state=active]:to-dental-primary data-[state=active]:text-white data-[state=active]:shadow-lg text-white/70 flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Smile className="h-5 w-5" />
            <span className="font-medium">Transformations</span>
          </TabsTrigger>
          <TabsTrigger
            value="equipment"
            className="rounded-xl py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-dental-secondary data-[state=active]:to-dental-primary data-[state=active]:text-white data-[state=active]:shadow-lg text-white/70 flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Wrench className="h-5 w-5" />
            <span className="font-medium">Our Equipment</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transformations">
          <div className="grid gap-8 md:grid-cols-2">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                id={`gallery-${item.id}`}
                data-gallery-item
                className={cn(
                  "group relative rounded-2xl transition-all duration-[420ms] ease-[cubic-bezier(0.22,0.9,0.32,1)]",
                  visibleItems.has(`gallery-${item.id}`) ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-dental-secondary/40 to-dental-glow/40 rounded-3xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 group-hover:border-dental-glow/30 transition-all">
                  <button
                    onClick={() => openLightbox(index)}
                    className="w-full text-left focus-ring rounded-xl"
                    aria-label={`View ${item.title} before and after photos`}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-white/10">
                        <Image
                          src={item.before || "/placeholder.svg"}
                          alt={`${item.title} - Before treatment`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 rounded-lg bg-white/20 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white border border-white/20">
                          Before
                        </span>
                      </div>
                      <div className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-dental-glow/30">
                        <Image
                          src={item.after || "/placeholder.svg"}
                          alt={`${item.title} - After treatment`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dental-secondary/30 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 rounded-lg bg-dental-secondary/80 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          After
                        </span>
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{item.title}</h3>
                        <p className="text-sm text-white/60 mt-1">{item.description}</p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dental-secondary/20 text-dental-glow group-hover:bg-dental-secondary/40 transition-colors">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="equipment">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {equipmentItems.map((item, index) => (
              <div
                key={item.id}
                id={`equipment-${item.id}`}
                data-gallery-item
                className={cn(
                  "group relative rounded-2xl transition-all duration-[420ms] ease-[cubic-bezier(0.22,0.9,0.32,1)]",
                  visibleItems.has(`equipment-${item.id}`) ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-dental-glow/30 to-dental-secondary/30 rounded-3xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 group-hover:border-dental-glow/30 hover:scale-[1.02] transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-white/10">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Lighter gradient for more visible images */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dental-deep/60 via-transparent to-transparent" />
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-white text-lg">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {lightboxOpen && (
        <Suspense fallback={null}>
          <Lightbox
            items={galleryItems}
            currentIndex={currentIndex}
            onClose={closeLightbox}
            onNavigate={setCurrentIndex}
          />
        </Suspense>
      )}
    </>
  )
}
