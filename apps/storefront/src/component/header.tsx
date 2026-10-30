"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "../constant/nav";
import MobileMenu from "./mobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // close the menu on any route change (links, back/forward, redirects)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // scroll lock, Escape to close, auto-close when viewport grows past md
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus(); // return focus to the toggle
      }
    };

    mq.addEventListener("change", onResize);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      mq.removeEventListener("change", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-6 z-50 flex justify-center px-4">
        <nav
          aria-label="Main"
          className="flex items-center gap-6 rounded-full bg-black px-6 py-3 text-xs font-bold uppercase text-white md:text-sm"
        >
          <Link href="/" className="text-base font-black italic tracking-tight">
            VoidWear
          </Link>

          {/* desktop links */}
          <ul className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-opacity hover:opacity-70"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden cursor-pointer"
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </header>

      <MobileMenu open={open} />
    </>
  );
}