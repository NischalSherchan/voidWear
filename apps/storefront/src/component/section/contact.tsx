import Link from "next/link";

export function HomeContactSection() {
  return (
    <section className="border-t border-black/10 bg-[#faf9f6] px-5 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-end">
          {/* Header & Quick Info */}
          <div>
            <p className="mb-4 text-[10px] tracking-[0.35em] text-black/50">
              GET IN TOUCH
            </p>

            <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
              Questions or custom inquiries?
            </h2>

            <p className="mt-6 max-w-md text-sm leading-6 text-black/50">
              Our team is available to assist with sizing advice, order tracking, and general questions.
            </p>

            <div className="mt-8 flex items-center gap-8 text-xs font-medium">
              <div>
                <span className="block text-[10px] tracking-[0.2em] text-black/40">SUPPORT</span>
                <span className="text-black">support@voidwear.com</span>
              </div>
              <div>
                <span className="block text-[10px] tracking-[0.2em] text-black/40">LOCATION</span>
                <span className="text-black">Kathmandu, Nepal</span>
              </div>
            </div>
          </div>

          {/* Action Card / Form Preview */}
          <div className="bg-[#efeee9] p-8 md:p-10 border border-black/5">
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase">
              Need Direct Support?
            </h3>
            <p className="mt-2 text-xs leading-5 text-black/50">
              Send us a direct message and our support team will respond within 24 hours.
            </p>

            <div className="mt-6">
              <Link
                href="/contact"
                className="block w-full bg-black py-4 text-center text-xs tracking-[0.25em] text-white transition-colors hover:bg-black/80"
              >
                CONTACT SUPPORT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}