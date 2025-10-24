// src/api/profile.ts
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  memberSince: string;
  totalProducts: number;
  totalSavings: number;
  avatar?: string;
}

// 🔹 Mock data mientras no hay backend
const MOCK_USER: User = {
  id: "1",
  name: "María Rodríguez",
  email: "maria.rodriguez@email.com",
  phone: "+506 8888-8888",
  location: "San José, Costa Rica",
  memberSince: "2025-01-15",
  totalProducts: 24,
  totalSavings: 18500,
};

// 🔹 API URL para el futuro
const API_URL = "https://tu-backend.com/api";

export async function getUserProfile(): Promise<User> {
  try {
    // 🔸 En el futuro: descomenta esto
    // const res = await fetch(`${API_URL}/user/profile`);
    // if (!res.ok) throw new Error("Error al cargar perfil");
    // return await res.json();

    // 🔹 Ahora: simulamos fetch local
    await new Promise((r) => setTimeout(r, 800)); // simula carga
    return MOCK_USER;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateUserProfile(userData: Partial<User>): Promise<User> {
  try {
    // 🔸 En el futuro: descomenta esto
    // const res = await fetch(`${API_URL}/user/profile`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // });
    // if (!res.ok) throw new Error("Error al actualizar perfil");
    // return await res.json();

    // 🔹 Ahora: simulamos actualización
    await new Promise((r) => setTimeout(r, 1000));
    return { ...MOCK_USER, ...userData };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function logout(): Promise<void> {
  try {
    // 🔸 En el futuro: descomenta esto
    // const res = await fetch(`${API_URL}/auth/logout`, { method: 'POST' });
    // if (!res.ok) throw new Error("Error al cerrar sesión");

    // 🔹 Ahora: simulamos logout
    await new Promise((r) => setTimeout(r, 500));
    console.log("Sesión cerrada exitosamente");
  } catch (err) {
    console.error(err);
    throw err;
  }
}