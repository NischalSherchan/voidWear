import Link from "next/link";
import { NAV_ITEMS } from "../constant/nav";

export default function MobileMenu({ open }: { open: boolean }) {
  return (
    <div
      id="mobile-menu"
      inert={!open}
      className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
        open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
      }`}
    >
      <div className="absolute inset-3 flex flex-col rounded-3xl bg-neutral-600/90 px-6 pb-6 pt-24">
        <ul className="flex flex-col items-end overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-2 text-4xl font-extrabold uppercase leading-tight tracking-tight text-white hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-end text-sm font-bold uppercase text-white">
          <Link href="/cart" className="bg-white px-5 py-3 text-black hover:bg-accent  hover:text-white">
            Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
