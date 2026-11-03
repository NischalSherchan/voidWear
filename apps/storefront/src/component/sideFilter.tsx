"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export type Filters = {
  sizes: string[];
  categories: string[];
  maxPrice: number | null; // dollars
};
export const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL"];
export const CATEGORY_OPTIONS = ["Tees", "Hoodies", "Jackets", "Pants"];
export const MAX_PRICE = 200;
export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false); // mobile drawer

  const selected = (key: string) => params.getAll(key);

  const update = (mutate: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const toggle = (key: string, value: string) =>
    update((p) => {
      const current = p.getAll(key);
      p.delete(key);
      const list = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      list.forEach((v) => p.append(key, v));
    });

  const maxPrice = Number(params.get("maxPrice") ?? MAX_PRICE);
  const activeCount =
    selected("size").length + selected("category").length + (params.get("maxPrice") ? 1 : 0);

  const clear = () => router.replace(pathname, { scroll: false });

  const panel = (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-widest">Filters</h3>
        {activeCount > 0 && (
          <button type="button" onClick={clear} className="text-xs font-bold uppercase underline">
            Clear ({activeCount})
          </button>
        )}
      </div>

      <fieldset>
        <legend className="mb-3 text-xs font-bold uppercase tracking-widest text-foreground/50">
          Size
        </legend>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((s) => {
            const on = selected("size").includes(s);
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => toggle("size", s)}
                className={`h-10 min-w-10 border px-3 text-sm font-bold transition-colors ${
                  on
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/30 hover:border-foreground"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-bold uppercase tracking-widest text-foreground/50">
          Category
        </legend>
        <ul className="flex flex-col gap-2">
          {CATEGORY_OPTIONS.map((c) => (
            <li key={c}>
              <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={selected("category").includes(c)}
                  onChange={() => toggle("category", c)}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                {c}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-bold uppercase tracking-widest text-foreground/50">
          Max price: ${maxPrice}
        </legend>
        <input
          type="range"
          min={10}
          max={MAX_PRICE}
          step={5}
          value={maxPrice}
          onChange={(e) =>
            update((p) => {
              if (Number(e.target.value) >= MAX_PRICE) p.delete("maxPrice");
              else p.set("maxPrice", e.target.value);
            })
          }
          className="w-full accent-[var(--accent)]"
        />
      </fieldset>
    </div>
  );

  return (
    <>
      {/* mobile: button + slide-in drawer */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-4 border border-foreground px-4 py-2 text-xs font-bold uppercase md:hidden"
      >
        Filters {activeCount > 0 && `(${activeCount})`}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-background p-6">
            {panel}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-8 w-full bg-foreground py-3 text-sm font-bold uppercase text-background"
            >
              Show results
            </button>
          </aside>
        </div>
      )}

      {/* desktop: sticky sidebar */}
      <aside className="sticky top-28 hidden w-64 shrink-0 self-start md:block">{panel}</aside>
    </>
  );
}