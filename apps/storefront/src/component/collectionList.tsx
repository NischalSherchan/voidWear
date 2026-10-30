"use client";

import { useEffect, useRef, useState } from "react";

export default function CollectionList({ items }: { items: string[] }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const locked = useRef(false);
  const touchY = useRef<number | null>(null);

  // move selection by +1 / -1, clamped, with a short cooldown
  const move = (dir: 1 | -1) => {
    if (locked.current) return true;
    let moved = false;
    setActive((i) => {
      const next = Math.min(items.length - 1, Math.max(0, i + dir));
      moved = next !== i;
      return next;
    });
    locked.current = true;
    setTimeout(() => (locked.current = false), 300);
    return moved;
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const dir = e.deltaY > 0 ? 1 : -1;
      const atEnd =
        (dir === 1 && active === items.length - 1) || (dir === -1 && active === 0);
      if (atEnd) return; // let the page scroll normally at the ends
      e.preventDefault();
      move(dir);
    };

    const onTouchStart = (e: TouchEvent) => (touchY.current = e.touches[0].clientY);
    const onTouchEnd = (e: TouchEvent) => {
      if (touchY.current === null) return;
      const diff = touchY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 30) move(diff > 0 ? 1 : -1);
      touchY.current = null;
    };

    // passive: false is required so preventDefault works on wheel
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [active, items.length]);

  return (
    <ul
      ref={listRef}
      className="flex flex-col gap-1 uppercase text-accent"
      aria-label="Collections"
    >
      {items.map((name, i) => {
        const distance = Math.abs(i - active);
        const isActive = distance === 0;

        return (
          <li key={name}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-current={isActive}
              className={`block origin-left text-left leading-tight transition-all duration-300 ${
                isActive
                  ? "scale-110 text-3xl font-extrabold opacity-100 md:text-4xl"
                  : distance === 1
                  ? "text-xl font-semibold opacity-75 blur-[0.5px] md:text-2xl"
                  : distance === 2
                  ? "text-lg font-medium opacity-50 blur-[1px]"
                  : "text-base font-medium opacity-25 blur-[1.5px]"
              }`}
            >
              {name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}