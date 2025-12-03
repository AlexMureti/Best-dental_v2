import Link from "next/link"
import Image from "next/image"
import { Instagram, Phone, Mail, MapPin, Clock } from "lucide-react"

const footerLinks = {
  services: [
    { name: "Teeth Whitening", href: "/services/teeth-whitening" },
    { name: "Dental Implants", href: "/services/dental-implants" },
    { name: "Braces", href: "/services/braces" },
    { name: "Veneers", href: "/services/veneers" },
    { name: "Root Canal", href: "/services/root-canal" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Gallery", href: "/gallery" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [{ name: "Privacy Policy", href: "/privacy" }],
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-t from-black to-dental-deep text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Image src="/logo.png" alt="Best Dental" width={140} height={48} className="h-10 w-auto" />
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Expert dental care in Juja, Central Kenya. Dr. Ken Walibora and team deliver cosmetic dentistry with
              precision and care.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.instagram.com/bestdentalservices"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full glass transition-colors hover:bg-dental-secondary focus-ring"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-dental-glow">Services</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white focus-ring rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-dental-glow">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white focus-ring rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-dental-glow">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-dental-glow" />
                <span className="text-sm text-white/70">Ken Walibora Road, Juja, Central Kenya</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-dental-glow" />
                <a href="tel:+254724124735" className="text-sm text-white/70 hover:text-white transition-colors">
                  0724 124735
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-dental-glow" />
                <a
                  href="mailto:info@bestdental.co.ke"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  info@bestdental.co.ke
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 shrink-0 text-dental-glow" />
                <div className="text-sm text-white/70">
                  <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
                  <p>Saturday: 9:00 AM - 1:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/50">© {new Date().getFullYear()} Best Dental. All rights reserved.</p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/50 transition-colors hover:text-white focus-ring rounded"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
