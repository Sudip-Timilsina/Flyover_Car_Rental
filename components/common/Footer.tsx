import { SITE_CONFIG, ROUTES } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

export function Footer() {
  const whatsappLink = `https://wa.me/${SITE_CONFIG.phone.replace(/\D/g, "")}`;

  return (
    <footer suppressHydrationWarning className="mt-24 border-t border-white/60 bg-slate-950 text-white">
      <div className="container-max py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <div className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-soft backdrop-blur">
              <Image
                src="/uploads/flyover-logo.jpg"
                alt="Flyover Car Rental"
                fill
                className="object-contain p-1"
                sizes="48px"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Flyover Car Rental</h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-slate-300">
                Reliable and premium car rental service in Pokhara. Book quickly
                via WhatsApp and travel comfortably with professional support.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <Link href={ROUTES.TOURS} className="transition hover:text-white">
                  Tours
                </Link>
              </li>
              <li>
                <Link href={ROUTES.DESTINATIONS} className="transition hover:text-white">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href={ROUTES.BLOG} className="transition hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={ROUTES.ABOUT} className="transition hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href={ROUTES.ADMIN_LOGIN} className="transition hover:text-white">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Contact</h4>
            <div className="space-y-3 text-sm text-slate-300">
              <p className="flex items-center gap-3" suppressHydrationWarning>
                <Mail className="h-4 w-4 text-accent-300" />
                {SITE_CONFIG.email}
              </p>
              <p className="flex items-center gap-3" suppressHydrationWarning>
                <Phone className="h-4 w-4 text-accent-300" />
                {SITE_CONFIG.phone}
              </p>
              <p className="flex items-start gap-3 leading-6" suppressHydrationWarning>
                <MapPin className="mt-0.5 h-4 w-4 text-accent-300" />
                {SITE_CONFIG.address}
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Follow Us</h4>
            <div className="flex items-center gap-3">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white">
                <Phone className="h-4 w-4" />
              </a>
              <a href="https://www.facebook.com/pickngoanywhere" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white">
                <Instagram className="h-4 w-4" />
              </a>
              {/* <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white">
                <Twitter className="h-4 w-4" />
              </a> */}
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
          <p>&copy; 2026 Flyover Car Rental. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
