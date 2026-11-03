import { HomeAboutSection } from "../component/section/about";
import { HomeContactSection } from "../component/section/contact";
import Hero from "../component/section/hero";
import Product from "../component/section/product";


export default async function Home() {
  return (
    <section>
      <Hero />
      <Product />
      <HomeAboutSection />
      <HomeContactSection />
    </section>
  );
}
