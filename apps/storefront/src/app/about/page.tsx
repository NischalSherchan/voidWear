import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] px-5 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <div className="mb-8 text-[10px] tracking-[0.2em] text-black/40">
          <Link href="/">HOME</Link>
          {" / "}
          <span className="text-black">ABOUT</span>
        </div>

        {/* Heading */}
        <div className="border-b border-black/10 pb-12">
          <p className="mb-3 text-[10px] tracking-[0.35em] text-black/50">
            VOIDWEAR / MANIFESTO
          </p>
          <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
            Designed for the unnoticed details.
          </h1>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-2 lg:gap-20 items-center">
          <div className="space-y-6 text-sm leading-7 text-black/60">
            <p>
              Founded in 2026, <strong className="text-black font-medium">VOIDWEAR</strong> was born out of a desire for restraint in modern streetwear. We believe that true style doesn't need to shout—it communicates through heavy textures, uncompromising silhouettes, and thoughtful minimalism.
            </p>
            <p>
              Every piece in our collection is meticulously patterned, dyed, and constructed to stand the test of time. We cut through the noise of fast fashion by focusing strictly on everyday essentials built with substance.
            </p>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden bg-[#efeee9]">
            <Image
              src="/olive-frontview.png"
              alt="Voidwear Brand Essence"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 gap-8 border-t border-black/10 pt-16 md:grid-cols-3">
          <div>
            <span className="text-[10px] tracking-[0.2em] text-black/40">01 / FABRIC</span>
            <h3 className="mt-2 text-sm font-medium tracking-wide">Heavyweight Quality</h3>
            <p className="mt-2 text-xs leading-6 text-black/50">
              Sourced using premium 100% cotton blends designed for longevity, structure, and ultimate comfort.
            </p>
          </div>

          <div>
            <span className="text-[10px] tracking-[0.2em] text-black/40">02 / SILHOUETTE</span>
            <h3 className="mt-2 text-sm font-medium tracking-wide">Relaxed Fit</h3>
            <p className="mt-2 text-xs leading-6 text-black/50">
              Thoughtfully engineered boxy and oversized cuts tailored for modern movement and everyday wear.
            </p>
          </div>

          <div>
            <span className="text-[10px] tracking-[0.2em] text-black/40">03 / ETHOS</span>
            <h3 className="mt-2 text-sm font-medium tracking-wide">Minimal Detailing</h3>
            <p className="mt-2 text-xs leading-6 text-black/50">
              Stripping away unnecessary noise to let clean lines and honest craftsmanship speak for themselves.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}