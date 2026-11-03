"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion } from "motion/react";

import BranchWithVine, { stemOffset, VINE_WIDTH } from "../branch";

type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
  sizes: string[];
  sideImage: string;
  frontImage: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Void Tee",
    price: "$28",
    description: "Heavyweight cotton. Boxy fit, washed black.",
    sizes: ["S", "M", "L", "XL"],
    sideImage: "/olive-side.png",
    frontImage: "/olive-frontview.png",
  },
  {
    id: 2,
    name: "Shadow Tee",
    price: "$28",
    description: "Soft cotton jersey with a relaxed drop shoulder.",
    sizes: ["S", "M", "L"],
    sideImage: "/olive-side.png",
    frontImage: "/olive-frontview.png",
  },
  {
    id: 3,
    name: "Night Tee",
    price: "$30",
    description: "Midnight black with a minimal chest print.",
    sizes: ["M", "L", "XL"],
    sideImage: "/olive-side.png",
    frontImage: "/olive-frontview.png",
  },
  {
    id: 4,
    name: "Eclipse Tee",
    price: "$30",
    description: "Oversized cut with a tight ribbed collar.",
    sizes: ["S", "M", "L", "XL"],
    sideImage: "/olive-side.png",
    frontImage: "/olive-frontview.png",
  },
];

const spring = { type: "spring", stiffness: 500, damping: 42 } as const;

// half the screen minus half a shirt (~80px), so the first/last shirt can reach the center
const SPACER = "calc(50vw - 80px)";

const Product = () => {
  const [selected, setSelected] = useState<Product | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const close = () => {
    setSelected(null);
    // give focus back to nothing, so the thumbnail doesn't keep its focus-visible state
    lastTriggerRef.current?.blur();
  };

  // dialog: scroll lock, focus, Escape
  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
        lastTriggerRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  // phones only (narrow AND no hover): the shirt nearest the center becomes "active"
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const mq = window.matchMedia("(max-width: 767px) and (hover: none)");

    const update = () => {
      const rect = root.getBoundingClientRect();
      const mid = rect.left + root.clientWidth / 2;
      let best: number | null = null;
      let bestDist = Infinity;
      root.querySelectorAll<HTMLElement>("[data-id]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.left + r.width / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = Number(el.dataset.id);
        }
      });
      setActiveId(best);
    };

    const attach = () => {
      root.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (mq.matches) {
        update();
        root.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
      } else {
        setActiveId(null); // desktop: hover only, nothing stays active
      }
    };

    attach();
    mq.addEventListener("change", attach);
    return () => {
      mq.removeEventListener("change", attach);
      root.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <MotionConfig transition={spring} reducedMotion="user">
      <section className="bg-[image:var(--shelf-gradient)] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <header className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/50">
              New arrivals
            </p>
            <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-foreground md:text-5xl">
              Our collection
            </h2>
          </header>

          <div className="relative mx-auto w-full max-w-6xl md:h-[520px]">
            {/* scroller: swipeable flex row on phones, plain block on desktop */}
            <div
              ref={scrollerRef}
              className="-mx-6 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:mx-0 md:block md:overflow-visible [&::-webkit-scrollbar]:hidden"
            >
              {/* left spacer (phones only) */}
              <div className="shrink-0 md:hidden" style={{ width: SPACER }} aria-hidden />

              {/* track: 640px on phones, 62% of the box on desktop */}
              <div className="relative min-w-[640px] shrink-0 pb-4 pt-20 [container-type:inline-size] md:absolute md:inset-x-[19%] md:top-[18%] md:min-w-0 md:p-0">
                {/* vine = the rail */}
                <div className="pointer-events-none absolute inset-x-0 top-20 -translate-y-1/2 md:top-0">
                  <BranchWithVine />
                </div>

                <ul className="relative grid grid-cols-4 gap-1">
                  {products.map((p, i) => {
                    const t = (i + 0.5) / products.length;
                    return (
                      <li
                        key={p.id}
                        data-id={p.id}
                        className="snap-center"
                        style={{
                          transform: `translateY(calc(${stemOffset(t).toFixed(2)} * 100cqw / ${VINE_WIDTH} - 12px ))`,
                        }}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            lastTriggerRef.current = e.currentTarget;
                            setSelected(p);
                          }}
                          aria-label={`View ${p.name}`}
                          data-active={activeId === p.id}
                          className="group block w-full cursor-pointer py-2 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          {/* lift lives on a wrapper, not on the layoutId element */}
                          <div className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 max-md:group-data-[active=true]:-translate-y-1 max-md:group-data-[active=true]:scale-105">
                            <motion.div
                              layoutId={`shirt-${p.id}`}
                              className="relative aspect-square w-full"
                            >
                              <Image
                                src={p.sideImage}
                                alt={`${p.name} side view`}
                                fill
                                sizes="400px"
                                className="object-contain transition-opacity duration-300 group-hover:opacity-0 max-md:group-data-[active=true]:opacity-0 group-focus-visible:opacity-0"
                              />
                              <Image
                                src={p.frontImage}
                                alt={`${p.name} front view`}
                                fill
                                sizes="400px"
                                className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:group-data-[active=true]:opacity-100 group-focus-visible:opacity-100"
                              />
                            </motion.div>
                          </div>

                          {/* "View" hint: hover, keyboard focus, or the active shirt on phones */}
                          <span className="pointer-events-none mt-2 inline-block translate-y-1 rounded-full bg-foreground px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-background opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-md:group-data-[active=true]:translate-y-0 max-md:group-data-[active=true]:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                            View
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* right spacer (phones only) */}
              <div className="shrink-0 md:hidden" style={{ width: SPACER }} aria-hidden />
            </div>

            <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-widest text-foreground/40 md:hidden">
              Swipe to browse →
            </p>
          </div>
        </div>

        {/* dialog: no AnimatePresence, so it unmounts instantly on close */}
        {selected && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 md:p-4"
            role="dialog"
            aria-modal="true"
            aria-label={selected.name}
          >
            <motion.div
              className="absolute inset-0 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              onClick={close}
            />

            <div className="relative grid w-full max-w-4xl rounded-3xl bg-[#ece6dc] p-6 max-md:max-h-[90dvh] max-md:overflow-y-auto md:grid-cols-2 md:gap-8 md:p-10">
              <motion.div
                layoutId={`shirt-${selected.id}`}
                className="relative aspect-square w-full"
              >
                <Image
                  src={selected.frontImage}
                  alt={`${selected.name} front view`}
                  fill
                  sizes="400px"
                  priority
                  className="object-contain"
                />
              </motion.div>

              <motion.div
                className="flex flex-col justify-center gap-4 py-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.25 }}
              >
                <h3 className="text-3xl font-extrabold uppercase tracking-tight text-foreground">
                  {selected.name}
                </h3>
                <p className="text-xl font-semibold text-foreground/70">
                  {selected.price}
                </p>
                <p className="text-foreground/70">{selected.description}</p>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-foreground/50">
                    Size
                  </p>
                  <div className="flex gap-2">
                    {selected.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="h-11 w-11 border border-foreground/30 text-sm font-bold transition-colors hover:border-foreground hover:bg-foreground hover:text-background md:h-10 md:w-10"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-2 bg-foreground px-6 py-3 text-sm font-bold uppercase text-background transition-colors hover:bg-accent"
                >
                  Add to cart
                </button>
              </motion.div>

              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white md:h-10 md:w-10"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </section>
    </MotionConfig>
  );
};

export default Product;