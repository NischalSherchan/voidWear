import Image from "next/image";
import Link from "next/link";
import type { HeroData } from "@voidwear/shared";
import CollectionList from "../collectionList";

const Hero = () => {
  const data: HeroData = {
    id: 1,
    title: "VoidWear",
    subTitle: "Dress for the dark.",
    heroImage: "/hero.png",
    button1: "Shop now",
    button1Link: "/products",
    button2: "About us",
    button2Link: "/about",
    collections: [
      "Summer collection",
      "Winter collection",
      "Dashain collection",
      "Tihar collection",
    ],
  };

  return (
    <section className="relative h-dvh w-full overflow-hidden bg-[image:var(--hero-gradient)]">
      <Image
        src={data.heroImage}
        alt={data.title}
        fill
        priority
        sizes="100vw"
        className="object-contain object-center"
      />

      {/* left: collections */}
   {/* left: collections */}
<div className="absolute bottom-8 left-6 z-10 md:bottom-auto md:left-10 md:top-1/2 md:-translate-y-1/2">
  <CollectionList items={data.collections} />
</div>

{/* right: nav buttons */}
<div className="absolute bottom-8 right-6 z-10 flex flex-col gap-3 md:bottom-auto md:right-10 md:top-1/2 md:-translate-y-1/2">
  <Link
    href={data.button1Link}
    className="bg-accent px-5 py-3 text-center text-sm font-bold uppercase text-white hover:opacity-90"
  >
    {data.button1}
  </Link>
</div>
    </section>
  );
};

export default Hero;
