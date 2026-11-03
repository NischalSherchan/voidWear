import Image from "next/image";
import Link from "next/link";

export function HomeAboutSection() {
  return (
    <section className="border-t border-black/10 bg-[#faf9f6] px-5 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="max-w-xl">
            <p className="mb-4 text-[10px] tracking-[0.35em] text-black/50">
              OUR MANIFESTO
            </p>

            <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
              Restraint in modern streetwear.
            </h2>

            <p className="mt-6 text-sm leading-7 text-black/60">
              VOIDWEAR was created to strip away the noise of fast fashion. 
              We focus on heavy textures, structured silhouettes, and uncompromising 
              craftsmanship built for everyday wear.
            </p>

            <div className="mt-8">
              <Link
                href="/about"
                className="inline-block border-b border-black pb-1 text-xs tracking-[0.2em] font-medium text-black transition-opacity hover:opacity-60"
              >
                READ OUR STORY →
              </Link>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="relative aspect-[4/5] overflow-hidden bg-[#efeee9]">
            <Image
              src="/olive-frontview.png"
              alt="VOIDWEAR Studio Preview"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}