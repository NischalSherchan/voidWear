import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] px-5 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <div className="mb-8 text-[10px] tracking-[0.2em] text-black/40">
          <Link href="/">HOME</Link>
          {" / "}
          <span className="text-black">CONTACT</span>
        </div>

        {/* Heading */}
        <div className="border-b border-black/10 pb-12">
          <p className="mb-3 text-[10px] tracking-[0.35em] text-black/50">
            VOIDWEAR / SUPPORT
          </p>
          <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
            Get in touch.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-black/50">
            Have questions about your order, sizing, or collaborations? Reach out to our team below.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-2 lg:gap-20">
          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block text-[10px] tracking-[0.2em] text-black/60 mb-2">
                YOUR NAME
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-only w-full border border-black/20 bg-transparent px-4 py-3 text-xs outline-none transition-colors focus:border-black"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.2em] text-black/60 mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full border border-black/20 bg-transparent px-4 py-3 text-xs outline-none transition-colors focus:border-black"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.2em] text-black/60 mb-2">
                MESSAGE
              </label>
              <textarea
                rows={5}
                placeholder="How can we help you?"
                className="w-full border border-black/20 bg-transparent px-4 py-3 text-xs outline-none transition-colors focus:border-black resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black py-4 text-xs tracking-[0.25em] text-white transition-colors hover:bg-black/80"
            >
              SEND MESSAGE
            </button>
          </form>

          {/* Direct Details */}
          <div className="space-y-10 lg:border-l lg:border-black/10 lg:pl-16">
            <div>
              <h3 className="text-xs font-medium tracking-[0.2em] text-black/40 mb-2">
                DIRECT EMAIL
              </h3>
              <p className="text-sm font-medium text-black">support@voidwear.com</p>
            </div>

            <div>
              <h3 className="text-xs font-medium tracking-[0.2em] text-black/40 mb-2">
                STUDIO / OFFICE
              </h3>
              <p className="text-sm font-medium text-black leading-6">
                Thamel, Kathmandu<br />
                Bagmati Province, Nepal
              </p>
            </div>

            <div>
              <h3 className="text-xs font-medium tracking-[0.2em] text-black/40 mb-2">
                WORKING HOURS
              </h3>
              <p className="text-sm font-medium text-black leading-6">
                Sunday – Friday: 10:00 AM – 6:00 PM<br />
                Saturday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}