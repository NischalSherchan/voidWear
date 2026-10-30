import Link from "next/link";
import { NAV_ITEMS } from "../constant/nav";

const social = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3 md:px-10">
        {/* brand */}
        <div>
          <Link href="/" className="text-2xl font-black italic tracking-tight">
            VoidWear
          </Link>
          <p className="mt-3 max-w-xs text-sm text-background/60">
            Dress for the dark. Minimal streetwear made for the night.
          </p>
        </div>

        {/* links */}
        <nav aria-label="Footer">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-accent">
            Explore
          </h2>
          <ul className="flex flex-col gap-2 text-sm font-semibold uppercase">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* social */}
        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-accent">
            Follow
          </h2>
          <ul className="flex flex-col gap-2 text-sm font-semibold uppercase">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-background/15">
        <p className="mx-auto max-w-7xl px-6 py-5 text-xs text-background/50 md:px-10">
          © {new Date().getFullYear()} VoidWear. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;