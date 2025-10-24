// src/api/shoppingList.ts
export interface Item {
  id: string;
  productName: string;
  quantity: number;
  category: string;
  checked: boolean;
  productId?: string; // Para vincular con productos del inventario
}

export interface ShoppingList {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  items: Item[];
  isCompleted: boolean;
}

// 🔹 Mock data mientras no hay backend
const MOCK_SHOPPING_LISTS: ShoppingList[] = [
  {
    id: "1",
    name: "Compras de la semana",
    createdAt: "2025-10-15T10:00:00Z",
    updatedAt: "2025-10-20T14:30:00Z",
    isCompleted: false,
    items: [
      {
        id: "1",
        productName: "Leche Dos Pinos",
        quantity: 2,
        category: "Lácteos",
        checked: false,
        productId: "1",
      },
      {
        id: "2",
        productName: "Tomates frescos",
        quantity: 1,
        category: "Verduras",
        checked: true,
        productId: "2",
      },
      {
        id: "3",
        productName: "Pan integral",
        quantity: 1,
        category: "Panadería",
        checked: false,
      },
    ],
  },
  {
    id: "2",
    name: "Lista para fiesta",
    createdAt: "2025-10-18T16:00:00Z",
    updatedAt: "2025-10-18T16:00:00Z",
    isCompleted: false,
    items: [
      {
        id: "4",
        productName: "Chips de papa",
        quantity: 3,
        category: "Snacks",
        checked: false,
        productId: "3",
      },
    ],
  },
];

// 🔹 API URL para el futuro
const API_URL = "https://tu-backend.com/api";

export async function getShoppingLists(): Promise<ShoppingList[]> {
  try {
    // 🔸 En el futuro: descomenta esto
    // const res = await fetch(`${API_URL}/shopping-lists`);
    // if (!res.ok) throw new Error("Error al cargar listas de compra");
    // return await res.json();

    // 🔹 Ahora: simulamos fetch local
    await new Promise((r) => setTimeout(r, 600)); // simula carga
    return MOCK_SHOPPING_LISTS;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createShoppingList(name: string): Promise<ShoppingList> {
  try {
    // 🔸 En el futuro: descomenta esto
    // const res = await fetch(`${API_URL}/shopping-lists`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name })
    // });
    // if (!res.ok) throw new Error("Error al crear lista");
    // return await res.json();

    // 🔹 Ahora: simulamos creación
    await new Promise((r) => setTimeout(r, 500));
    return {
      id: Date.now().toString(),
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: [],
      isCompleted: false,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateShoppingList(listId: string, updates: Partial<ShoppingList>): Promise<ShoppingList> {
  try {
    // 🔸 En el futuro: descomenta esto
    // const res = await fetch(`${API_URL}/shopping-lists/${listId}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updates)
    // });
    // if (!res.ok) throw new Error("Error al actualizar lista");
    // return await res.json();

    // 🔹 Ahora: simulamos actualización
    await new Promise((r) => setTimeout(r, 400));
    const existingList = MOCK_SHOPPING_LISTS.find(l => l.id === listId);
    if (!existingList) throw new Error("Lista no encontrada");
    
    return { ...existingList, ...updates, updatedAt: new Date().toISOString() };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteShoppingList(listId: string): Promise<void> {
  try {
    // 🔸 En el futuro: descomenta esto
    // const res = await fetch(`${API_URL}/shopping-lists/${listId}`, {
    //   method: 'DELETE'
    // });
    // if (!res.ok) throw new Error("Error al eliminar lista");

    // 🔹 Ahora: simulamos eliminación
    await new Promise((r) => setTimeout(r, 300));
    console.log(`Lista ${listId} eliminada`);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function addItemToList(listId: string, item: Omit<Item, 'id'>): Promise<Item> {
  try {
    // 🔸 En el futuro: descomenta esto
    // const res = await fetch(`${API_URL}/shopping-lists/${listId}/items`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(item)
    // });
    // if (!res.ok) throw new Error("Error al agregar item");
    // return await res.json();

    // 🔹 Ahora: simulamos adición
    await new Promise((r) => setTimeout(r, 400));
    return { ...item, id: Date.now().toString() };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateItem(listId: string, itemId: string, updates: Partial<Item>): Promise<Item> {
  try {
    // 🔸 En el futuro: descomenta esto
    // const res = await fetch(`${API_URL}/shopping-lists/${listId}/items/${itemId}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updates)
    // });
    // if (!res.ok) throw new Error("Error al actualizar item");
    // return await res.json();

    // 🔹 Ahora: simulamos actualización
    await new Promise((r) => setTimeout(r, 300));
    const list = MOCK_SHOPPING_LISTS.find(l => l.id === listId);
    const item = list?.items.find(i => i.id === itemId);
    if (!item) throw new Error("Item no encontrado");
    
    return { ...item, ...updates };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteItem(listId: string, itemId: string): Promise<void> {
  try {
    // 🔸 En el futuro: descomenta esto
    // const res = await fetch(`${API_URL}/shopping-lists/${listId}/items/${itemId}`, {
    //   method: 'DELETE'
    // });
    // if (!res.ok) throw new Error("Error al eliminar item");

    // 🔹 Ahora: simulamos eliminación
    await new Promise((r) => setTimeout(r, 250));
    console.log(`Item ${itemId} eliminado de lista ${listId}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
}