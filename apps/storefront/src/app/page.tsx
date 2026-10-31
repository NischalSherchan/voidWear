import Hero from "../component/section/hero";
import Product from "../component/section/product";

export default async function Home() {
  return (
    <section>
      <Hero />
      <Product />
    </section>
  );
}
