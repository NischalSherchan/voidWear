import { useEffect, useState } from 'react'
import { API_ROUTES, type Product } from '@voidwear/shared'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

export default function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch(`${API_URL}${API_ROUTES.PRODUCTS}`)
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error)
  }, [])

  return (
    <main style={{ padding: 24 }}>
      <h1>Admin</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price} ({p.status})
          </li>
        ))}
      </ul>
    </main>
  )
}