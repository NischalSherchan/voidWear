import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  material: string;
  tag?: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Essential Oversized Tee",
    category: "T-Shirts",
    price: 1200,
    description:
      "A timeless oversized silhouette crafted for everyday comfort. Designed with a relaxed fit, premium fabric, and minimal detailing.",
    images: ["/olive-frontview.png", "/olive-side.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Olive", hex: "#646b46" },
      { name: "Black", hex: "#171717" },
      { name: "White", hex: "#f5f5f0" },
    ],
    material: "100% Premium Cotton",
    tag: "BEST SELLER",
  },
  {
    id: 2,
    name: "Minimal Heavyweight Tee",
    category: "T-Shirts",
    price: 1500,
    description:
      "A heavyweight essential featuring a structured oversized silhouette and a comfortable everyday fit.",
    images: ["/olive-frontview.png", "/olive-side.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#171717" },
      { name: "White", hex: "#f5f5f0" },
    ],
    material: "Heavyweight Cotton",
    tag: "NEW",
  },
  {
    id: 3,
    name: "Classic Streetwear Hoodie",
    category: "Hoodies",
    price: 2800,
    description: "A relaxed everyday hoodie with a clean streetwear silhouette.",
    images: ["/olive-frontview.png", "/olive-side.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#171717" }],
    material: "Premium Cotton Blend",
  },
  {
    id: 4,
    name: "Relaxed Fit Cargo",
    category: "Pants",
    price: 2400,
    description: "Relaxed-fit cargo pants designed for everyday movement.",
    images: ["/olive-frontview.png", "/olive-side.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Olive", hex: "#646b46" }],
    material: "Cotton Twill",
  },
  {
    id: 5,
    name: "Signature Boxy Tee",
    category: "T-Shirts",
    price: 1300,
    description: "A minimal boxy tee with a relaxed silhouette.",
    images: ["/olive-frontview.png", "/olive-side.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Olive", hex: "#646b46" }],
    material: "100% Premium Cotton",
    tag: "NEW",
  },
  {
    id: 6,
    name: "Essential Zip Hoodie",
    category: "Hoodies",
    price: 3200,
    description: "A versatile zip hoodie with a comfortable relaxed fit.",
    images: ["/olive-frontview.png", "/olive-side.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#171717" }],
    material: "Premium Cotton Blend",
  },
  {
    id: 7,
    name: "Wide Leg Sweatpants",
    category: "Pants",
    price: 2200,
    description: "Comfortable wide-leg sweatpants with a relaxed fit.",
    images: ["/olive-frontview.png", "/olive-side.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#171717" }],
    material: "Cotton Fleece",
  },
  {
    id: 8,
    name: "Oversized Graphic Tee",
    category: "T-Shirts",
    price: 1600,
    description: "An oversized graphic tee designed to make a statement.",
    images: ["/olive-frontview.png", "/olive-side.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#171717" }],
    material: "100% Premium Cotton",
  },
  {
    id: 9,
    name: "Premium Streetwear Jacket",
    category: "Outerwear",
    price: 4500,
    description: "A statement outerwear piece with a modern streetwear fit.",
    images: ["/olive-frontview.png", "/olive-side.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#171717" }],
    material: "Premium Fabric",
    tag: "LIMITED",
  },
];

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] px-5 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8 text-[10px] tracking-[0.2em] text-black/40">
          <Link href="/">HOME</Link>
          {" / "}
          <Link href="/product">SHOP</Link>
          {" / "}
          <span className="text-black">{product.name.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          {/* Product Images */}
          <div className="grid grid-cols-2 gap-3">
            {product.images.map((image, index) => (
              <div
                key={image}
                className={`relative overflow-hidden bg-[#efeee9] ${
                  index === 0 ? "col-span-2 aspect-[4/5]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Product Information */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div className="flex items-center justify-between">
              <p className="text-[10px] tracking-[0.3em] text-black/40">
                VOIDWEAR / {product.category.toUpperCase()}
              </p>

              {product.tag && (
                <span className="bg-black px-3 py-1.5 text-[9px] tracking-widest text-white">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="mt-5 text-3xl font-medium tracking-tight md:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-lg font-medium">
              NPR {product.price.toLocaleString("en-IN")}
            </p>

            <div className="my-8 h-px bg-black/10" />

            <p className="max-w-lg text-sm leading-7 text-black/50">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mt-10">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xs font-medium tracking-[0.2em]">
                  AVAILABLE COLORS
                </h3>
              </div>

              <div className="flex items-center gap-4">
                {product.colors.map((color) => (
                  <div
                    key={color.name}
                    className="flex flex-col items-center gap-2"
                  >
                    <span
                      className="h-8 w-8 rounded-full border border-black/20"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                    <span className="text-[10px] text-black/50">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-10">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xs font-medium tracking-[0.2em]">
                  SELECT SIZE
                </h3>

                <button className="text-[10px] text-black/50 underline underline-offset-4">
                  SIZE GUIDE
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="border border-black/20 py-4 text-xs transition-colors hover:border-black hover:bg-black hover:text-white"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase Actions */}
            <div className="mt-10 space-y-3">
              <button className="w-full bg-black py-5 text-xs tracking-[0.25em] text-white transition-colors hover:bg-black/80">
                ADD TO BAG
              </button>

              <button className="w-full border border-black py-5 text-xs tracking-[0.25em] transition-colors hover:bg-black hover:text-white">
                BUY NOW
              </button>
            </div>

            {/* Product Details */}
            <div className="mt-12 border-t border-black/10 pt-7">
              <h3 className="mb-6 text-xs font-medium tracking-[0.2em]">
                PRODUCT DETAILS
              </h3>

              <div className="space-y-5">
                <div className="flex justify-between text-xs">
                  <span className="text-black/40">MATERIAL</span>
                  <span>{product.material}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-black/40">CATEGORY</span>
                  <span>{product.category}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-black/40">PRODUCT CODE</span>
                  <span>VW-{String(product.id).padStart(4, "0")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}