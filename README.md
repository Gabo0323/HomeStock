# HomeStock

Aplicación móvil para gestionar el inventario del hogar: qué productos hay en casa, cuánto queda, qué hay que comprar y cuánto cuesta. Está construida con **React Native (Expo) y TypeScript**, siguiendo una **arquitectura limpia** por capas, y consume una **API REST** con autenticación JWT.

---

## Funcionalidades

- **Autenticación:** registro, inicio y cierre de sesión, consulta del usuario actual y renovación del token de acceso (refresh token).
- **Inventario:** alta de productos en inventario, consumo (individual o en lote) y transferencia de stock.
- **Productos:** creación, consulta, edición y eliminación de productos por usuario.
- **Categorías y tiendas:** catálogo propio de categorías y de tiendas donde se compra.
- **Listas de compras:** creación de listas, agregado y edición de ítems, **generación automática de ítems a partir de productos con stock bajo** y **conversión de una lista en compra**.
- **Historial de precios:** registro de precios por producto y consulta del último precio, para comparar.
- **Alertas:** creación, actualización y cierre de alertas (por ejemplo, stock bajo).
- **Calificaciones:** valoración de productos.
- **Movimientos y consumos:** registro de entradas y salidas de inventario.

---

## Stack

| Área | Tecnología |
|---|---|
| Lenguaje | TypeScript (modo `strict`) |
| Framework móvil | React Native 0.81 + Expo 54 |
| Navegación | React Navigation (native stack y bottom tabs) |
| Estado | MobX (`mobx`, `mobx-react-lite`) |
| HTTP | Axios con interceptor de autenticación |
| Almacenamiento local | AsyncStorage (tokens de sesión) |
| Pruebas | Jest + ts-jest (preset `jest-expo`) |

---

## Arquitectura

El proyecto separa responsabilidades en tres capas. Las dependencias apuntan siempre hacia el dominio: la UI no conoce la API y el dominio no conoce ni la UI ni Axios.

```
┌───────────────────────────── presentation ─────────────────────────────┐
│  screens (UI)  →  viewModels (estado con MobX)  ←  container (inyección)│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ usa
┌──────────────────────────────── domain ────────────────────────────────┐
│  useCases (reglas de la app)  →  repositories (interfaces)  ·  entities │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ implementa
┌───────────────────────────────── data ─────────────────────────────────┐
│  repositories (impl)  →  datasources (llamadas HTTP)  ·  dto  ·  mapper │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                         api/axiosClient  →  API REST
```

- **`domain/`**: entidades del negocio, contratos de repositorios y casos de uso (uno por acción, por ejemplo `GenerateItemsFromLowStockUseCase` o `TransferStockUseCase`). No depende de librerías externas.
- **`data/`**: implementación de los repositorios. Los *datasources* hacen las llamadas HTTP, los *DTOs* modelan las respuestas de la API y los *mappers* convierten DTO ↔ entidad.
- **`presentation/`**: pantallas, ViewModels observables con MobX (exponen `loading`, `error` y los datos) y *containers* que arman la cadena de dependencias.

### Ejemplo de flujo: listar productos

1. `InventoryScreen` llama a `productViewModel.getProductsByUserId(userId)`.
2. El ViewModel activa `loading` y ejecuta `GetProductsByUserIdUseCase`.
3. El caso de uso llama al contrato `ProductRepository`.
4. `ProductRepositoryImpl` usa `ProductRemoteDataSource`, que hace `GET /users/{userId}/products`.
5. La respuesta (DTO) se convierte en entidades `Product` con `productMapper`.
6. El ViewModel actualiza `products` y la pantalla se vuelve a renderizar.

### Inyección de dependencias

Cada módulo tiene un *container* (`presentation/container/`) que instancia la cadena completa y exporta un ViewModel listo para usar:

```ts
const remote = new ProductRemoteDataSource();
const repo = new ProductRepositoryImpl(remote);

export const productViewModel = new ProductViewModel(
  new CreateProductUseCase(repo),
  new GetProductsByUserIdUseCase(repo),
  new GetProductByIdUseCase(repo),
  new UpdateProductUseCase(repo),
  new DeleteProductUseCase(repo)
);
```

Esto permite reemplazar el origen de datos (por ejemplo, por un mock en las pruebas) sin tocar el dominio ni la UI.

### Autenticación

- Al iniciar sesión, el *access token* y el *refresh token* se guardan en AsyncStorage.
- El interceptor de `api/axiosClient.ts` agrega `Authorization: Bearer <token>` a cada petición, excepto a `/auth/login` y `/auth/refresh`.
- `RefreshUseCase` obtiene un nuevo token de acceso con `POST /auth/refresh`.

---

## Estructura del proyecto

```
.
├── App.tsx                     # Navegación principal
├── index.ts                    # Punto de entrada de Expo
├── jest.config.js / jest.setup.ts
└── src/
    ├── api/axiosClient.ts      # Cliente HTTP + interceptor de token
    ├── domain/
    │   ├── entities/
    │   ├── repositories/       # Interfaces
    │   └── useCases/
    ├── data/
    │   ├── datasources/        # Llamadas a la API
    │   ├── dto/
    │   ├── mapper/
    │   └── repositories/       # Implementaciones
    ├── presentation/
    │   ├── screens/
    │   ├── viewModels/
    │   ├── container/
    │   └── components/
    ├── types/navigation.ts
    └── Test/                   # Pruebas unitarias y de integración
```

---

## API consumida

URL base: `https://backend-homestock.onrender.com/api/v1` (definida en `src/api/axiosClient.ts`).

| Recurso | Endpoints principales |
|---|---|
| Auth | `POST /auth/register`, `POST /auth/login`, `GET /auth/me`, `POST /auth/refresh`, `POST /auth/logout` |
| Productos | `POST /products`, `GET /products/{id}`, `GET /users/{userId}/products`, `PATCH /products/{id}`, `DELETE /products/{id}` |
| Inventario | `GET /inventory`, `POST /inventory`, `POST /inventory/consume`, `POST /inventory/transfer` |
| Listas de compras | `POST /shopping-lists`, `GET /shopping-lists`, `GET /shopping-lists/{id}`, `POST /shopping-lists/{id}/items`, `POST /shopping-lists/{id}/generate-from-low-stock`, `POST /shopping-lists/{id}/to-purchase` |
| Ítems de compra | `POST /shopping-items`, `GET /users/{userId}/shopping-items` |
| Categorías / Tiendas | CRUD en `/categories` y `/stores` |
| Precios | `POST /price-history`, `GET /price-history/products/{id}/last` |
| Alertas | `POST /alerts`, `GET /alerts/{id}`, `GET /users/{userId}/alerts/active`, `PATCH /alerts/{id}`, `PATCH /alerts/{id}/close` |
| Otros | `POST /movements`, `POST /consumptions`, `PUT /ratings` |

---

## Cómo ejecutarlo

**Requisitos:** Node.js 18 o superior, npm y la app **Expo Go** en el celular (o un emulador Android/iOS).

```bash
git clone https://github.com/Gabo0323/HomeStock.git
cd HomeStock
npm install
npx expo start
```

Después escaneá el código QR con Expo Go, o presioná `a` (Android) o `i` (iOS) para abrir un emulador.

> **Nota:** el backend está alojado en un plan gratuito de Render, que se suspende por inactividad. La primera petición puede tardar entre 30 y 60 segundos mientras el servidor arranca.

---

## Pruebas

```bash
npx jest
```

La carpeta `src/Test/` incluye:

- **Pruebas unitarias** de casos de uso, ViewModels y mappers de listas de compras e ítems, con dependencias simuladas (`jest.mock`) o datos de ejemplo.
- **Pruebas de integración** que recorren la cadena completa (ViewModel → caso de uso → repositorio → API real) para autenticación (registro, login, `me`, refresh y logout), productos, inventario, tiendas, categorías, alertas, movimientos, consumos, precios y calificaciones.

Las pruebas de integración necesitan que el backend esté disponible. AsyncStorage se simula en `jest.setup.ts`.
