"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  MapPin,
  Compass,
  BookOpen,
  PhoneCall,
  SunMoon,
  MoonStar,
  LogIn,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/utils/helpers";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem("theme") === "dark";
    setDarkMode(stored);
    document.documentElement.classList.toggle("dark", stored);

    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = useMemo(
    () => [
      { href: ROUTES.TOURS, label: "Tours", icon: Compass },
      { href: ROUTES.DESTINATIONS, label: "Destinations", icon: MapPin },
      { href: ROUTES.BLOG, label: "Stories", icon: BookOpen },
      { href: ROUTES.CONTACT, label: "Contact", icon: PhoneCall },
    ],
    []
  );

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-white/70 bg-white/90 backdrop-blur-xl shadow-soft dark:border-slate-800/80 dark:bg-slate-950/85"
          : "border-transparent bg-white/40 backdrop-blur-md dark:bg-slate-950/40"
      )}
    >
      <div className="container-max">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href={ROUTES.HOME} className="group flex items-center gap-3">
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-glow transition group-hover:scale-105">
              <Image
                src="/uploads/flyover-logo.jpg"
                alt="Flyover Car Rental"
                fill
                className="object-contain p-1"
                sizes="44px"
                priority
              />
            </span>
            <span>
              <span className="block text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                Flyover Car Rental
              </span>
              <span className="block text-xs font-medium uppercase tracking-[0.25em] text-slate-500 dark:text-slate-900">
                Himalayan Journey
              </span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/60 bg-white/75 p-2 shadow-glass backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                    active
                      ? "bg-primary-600 text-white shadow-soft"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  )}
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={ROUTES.ADMIN_LOGIN}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900/80 dark:text-white"
              aria-label="Admin Login"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>

            <button
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/80 text-slate-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900/80 dark:text-white"
              aria-label="Toggle theme"
            >
              {mounted && darkMode ? <SunMoon className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/80 text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft lg:hidden dark:border-slate-800 dark:bg-slate-900/80 dark:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-white/70 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95"
          >
            <div className="container-max py-4">
              <div className="grid gap-2">
                {navigation.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition",
                        active
                          ? "bg-primary-600 text-white shadow-soft"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        {Icon ? <Icon className="h-4 w-4" /> : null}
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
                <Link
                  href={ROUTES.ADMIN_LOGIN}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <span className="flex items-center gap-3">
                    <LogIn className="h-4 w-4" />
                    Admin
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
