// src/api/products.ts
export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  status: string;
}

// 🔹 Fase 1 (mock data mientras no hay backend)
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Leche Dos Pinos",
    category: "Lácteos",
    image: "https://example.com/leche.png",
    price: 1500,
    status: "Disponible",
  },
  {
    id: "2",
    name: "Tomate",
    category: "Verduras",
    image: "https://example.com/tomate.png",
    price: 800,
    status: "Disponible",
  },
];

// 🔹 Fase 2 (cuando tengas backend, solo reemplazas fetch local por remoto)
const API_URL = "https://tu-backend.com/api";

export async function getProducts(): Promise<Product[]> {
  try {
    // 🔸 En el futuro: descomenta esto
    // const res = await fetch(`${API_URL}/products`);
    // if (!res.ok) throw new Error("Error al cargar productos");
    // return await res.json();

    // 🔹 Ahora: simulamos fetch local
    await new Promise((r) => setTimeout(r, 500)); // simula carga
    return MOCK_PRODUCTS;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
