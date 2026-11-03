import FilterSidebar from "@/src/component/sideFilter";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const products = [
  {
    id: 1,
    name: "Essential Oversized Tee",
    category: "T-Shirts",
    price: 1200,
    image: "/olive-frontview.png",
    tag: "BEST SELLER",
  },
  {
    id: 2,
    name: "Minimal Heavyweight Tee",
    category: "T-Shirts",
    price: 1500,
    image: "/olive-frontview.png",
    tag: "NEW",
  },
  {
    id: 3,
    name: "Classic Streetwear Hoodie",
    category: "Hoodies",
    price: 2800,
    image: "/olive-frontview.png",
    tag: "",
  },
  {
    id: 4,
    name: "Relaxed Fit Cargo",
    category: "Pants",
    price: 2400,
    image: "/olive-frontview.png",
    tag: "",
  },
  {
    id: 5,
    name: "Signature Boxy Tee",
    category: "T-Shirts",
    price: 1300,
    image: "/olive-frontview.png",
    tag: "NEW",
  },
  {
    id: 6,
    name: "Essential Zip Hoodie",
    category: "Hoodies",
    price: 3200,
    image: "/olive-frontview.png",
    tag: "",
  },
  {
    id: 7,
    name: "Wide Leg Sweatpants",
    category: "Pants",
    price: 2200,
    image: "/olive-frontview.png",
    tag: "",
  },
  {
    id: 8,
    name: "Oversized Graphic Tee",
    category: "T-Shirts",
    price: 1600,
    image: "/olive-frontview.png",
    tag: "",
  },
  {
    id: 9,
    name: "Premium Streetwear Jacket",
    category: "Outerwear",
    price: 4500,
    image: "/olive-frontview.png",
    tag: "LIMITED",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8">
        {/* Page Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[10px] tracking-[0.35em] text-black/50">
              VOIDWEAR / COLLECTION
            </p>

            <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
              All Products
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-black/50">
              Explore our collection of thoughtfully designed essentials. Built
              for everyday wear, made to stand out.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-black/50">
            <span>2026 COLLECTION</span>
            <span className="h-1 w-1 rounded-full bg-black/40" />
            <span>{products.length} PRODUCTS</span>
          </div>
        </div>

        {/* Products Layout */}
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-60">
            <Suspense
              fallback={
                <div className="text-sm text-black/40">Loading filters...</div>
              }
            >
              <FilterSidebar />
            </Suspense>
          </aside>

          {/* Product Section */}
          <section className="min-w-0 flex-1">
            {/* Toolbar */}
            <div className="mb-7 flex items-center justify-between border-b border-black/10 pb-4">
              <p className="text-xs text-black/50">
                Showing <span className="text-black">{products.length}</span>{" "}
                products
              </p>

              <select
                defaultValue="featured"
                className="cursor-pointer bg-transparent text-xs outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
              {products.map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="group block"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#efeee9]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Product Tag */}
                    {product.tag && (
                      <span className="absolute left-3 top-3 bg-white px-2.5 py-1 text-[9px] tracking-widest text-black">
                        {product.tag}
                      </span>
                    )}

                    {/* Quick View */}
                    <div className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="bg-white/95 py-3 text-center text-[10px] tracking-[0.2em] text-black backdrop-blur-sm">
                        VIEW PRODUCT
                      </div>
                    </div>
                  </div>

                  {/* Product Information */}
                  <div className="mt-4 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-medium tracking-wide text-black md:text-sm">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-[11px] text-black/40">
                        {product.category}
                      </p>
                    </div>

                    <p className="shrink-0 text-xs font-medium text-black md:text-sm">
                      NPR {product.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-20 flex items-center justify-center border-t border-black/10 pt-8">
              <button className="border border-black px-8 py-3 text-[10px] tracking-[0.2em] transition-colors hover:bg-black hover:text-white">
                LOAD MORE
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}