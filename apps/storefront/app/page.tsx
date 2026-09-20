import { API_ROUTES, type Product } from '@voidwear/shared';

export const dynamic = 'force-dynamic';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export default async function Home() {
  let products: Product[] = [];
  try {
    const res = await fetch(`${API_URL}${API_ROUTES.PRODUCTS}`, { cache: 'no-store' });
    products = await res.json();
  } catch {
    // backend not running yet
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Storefront</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
    </main>
  );
}