import { Product, ShoppingList, ProductComparison, ProductRating, Notification, Purchase } from './types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Spaghetti',
    category: 'Granos',
    quantity: 2,
    unit: 'paquetes',
    expirationDate: '2025-10-15',
    price: 1500,
    brand: 'Dos Pinos',
    store: 'Walmart',
    image: 'https://images.unsplash.com/photo-1635264685671-739e75e73e0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFnaGV0dGklMjBwYXN0YXxlbnwxfHx8fDE3NTkxODMzOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    barcode: '7501234567890',
    status: 'low'
  },
  {
    id: '2',
    name: 'Leche',
    category: 'Lácteos',
    quantity: 1,
    unit: 'litros',
    expirationDate: '2025-10-02',
    price: 1200,
    brand: 'Dos Pinos',
    store: 'Automercado',
    image: 'https://images.unsplash.com/photo-1576186726115-4d51596775d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwYm90dGxlfGVufDF8fHx8MTc1OTE4MzM5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    barcode: '7501234567891',
    status: 'warning'
  },
  {
    id: '3',
    name: 'Arroz',
    category: 'Granos',
    quantity: 3,
    unit: 'kilogramos',
    expirationDate: '2026-03-20',
    price: 2500,
    brand: 'Tío Pelón',
    store: 'MásxMenos',
    image: 'https://images.unsplash.com/photo-1719532520316-4cc0d8886ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwYmFnfGVufDF8fHx8MTc1OTE4MzM5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    barcode: '7501234567892',
    status: 'good'
  },
  {
    id: '4',
    name: 'Café',
    category: 'Bebidas',
    quantity: 5,
    unit: 'paquetes',
    expirationDate: '2026-01-15',
    price: 3200,
    brand: 'Britt',
    store: 'Automercado',
    image: 'https://images.unsplash.com/photo-1675306408031-a9aad9f23308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFuc3xlbnwxfHx8fDE3NTkwOTQyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    barcode: '7501234567893',
    status: 'good'
  },
  {
    id: '5',
    name: 'Pan',
    category: 'Panadería',
    quantity: 0,
    unit: 'unidades',
    expirationDate: '2025-09-30',
    price: 800,
    brand: 'Bimbo',
    store: 'Palí',
    image: 'https://images.unsplash.com/photo-1598373182308-3270495d2f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhZCUyMGxvYWZ8ZW58MXx8fHwxNzU5MDY5NTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    barcode: '7501234567894',
    status: 'expired'
  },
  {
    id: '6',
    name: 'Aceite de Cocina',
    category: 'Despensa',
    quantity: 2,
    unit: 'botellas',
    expirationDate: '2026-06-12',
    price: 4500,
    brand: 'Olitalia',
    store: 'Fresh Market',
    image: 'https://images.unsplash.com/photo-1662058595162-10e024b1a907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwb2lsJTIwYm90dGxlfGVufDF8fHx8MTc1OTEzMzY0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    barcode: '7501234567895',
    status: 'good'
  }
];

export const initialShoppingLists: ShoppingList[] = [
  {
    id: '1',
    name: 'Compra Semanal',
    createdAt: '2025-09-25',
    items: [
      { id: '1', productName: 'Pan', quantity: 1, checked: false, category: 'Panadería' },
      { id: '2', productName: 'Spaghetti', quantity: 3, checked: false, category: 'Granos' },
      { id: '3', productName: 'Leche', quantity: 2, checked: true, category: 'Lácteos' }
    ]
  },
  {
    id: '2',
    name: 'Productos Agotados',
    createdAt: '2025-09-29',
    items: [
      { id: '4', productName: 'Pan', quantity: 1, checked: false, category: 'Panadería' }
    ]
  }
];

export const productComparisons: ProductComparison[] = [
  {
    productName: 'Leche Entera 1L',
    stores: [
      { name: 'Walmart', price: 1150, rating: 4.5 },
      { name: 'Automercado', price: 1200, rating: 4.8 },
      { name: 'MásxMenos', price: 1180, rating: 4.3 },
      { name: 'Palí', price: 1050, rating: 4.0 },
      { name: 'Fresh Market', price: 1250, rating: 4.9 }
    ]
  },
  {
    productName: 'Arroz 1kg',
    stores: [
      { name: 'Walmart', price: 850, rating: 4.2 },
      { name: 'Automercado', price: 900, rating: 4.7 },
      { name: 'MásxMenos', price: 820, rating: 4.4 },
      { name: 'Palí', price: 780, rating: 3.9 },
      { name: 'Megasuper', price: 880, rating: 4.5 }
    ]
  },
  {
    productName: 'Café 500g',
    stores: [
      { name: 'Walmart', price: 3100, rating: 4.6 },
      { name: 'Automercado', price: 3200, rating: 4.9 },
      { name: 'MásxMenos', price: 3050, rating: 4.5 },
      { name: 'Fresh Market', price: 3300, rating: 5.0 }
    ]
  }
];

export const productRatings: ProductRating[] = [
  {
    productId: '2',
    productName: 'Leche Dos Pinos',
    rating: 5,
    comment: 'Excelente calidad, siempre fresca. La compro cada semana.',
    userName: 'María Rodríguez',
    date: '2025-09-20'
  },
  {
    productId: '4',
    productName: 'Café Britt',
    rating: 5,
    comment: 'El mejor café de Costa Rica, aroma increíble.',
    userName: 'Carlos Méndez',
    date: '2025-09-18'
  },
  {
    productId: '3',
    productName: 'Arroz Tío Pelón',
    rating: 4,
    comment: 'Buena relación calidad-precio, se cocina bien.',
    userName: 'Ana López',
    date: '2025-09-15'
  }
];

export const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'expired',
    title: 'Producto vencido',
    message: 'El Pan ha caducado. Considera retirarlo del inventario.',
    productId: '5',
    productName: 'Pan',
    productImage: 'https://images.unsplash.com/photo-1598373182308-3270495d2f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhZCUyMGxvYWZ8ZW58MXx8fHwxNzU5MDY5NTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2025-10-12T08:30:00',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'expiring',
    title: 'Producto por vencer',
    message: 'La Leche vence en 2 días. Recuerda consumirla pronto.',
    productId: '2',
    productName: 'Leche',
    productImage: 'https://images.unsplash.com/photo-1576186726115-4d51596775d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwYm90dGxlfGVufDF8fHx8MTc1OTE4MzM5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2025-10-12T07:15:00',
    read: false,
    priority: 'high'
  },
  {
    id: '3',
    type: 'low-stock',
    title: 'Stock bajo',
    message: 'Sólo quedan 2 paquetes de Spaghetti en tu inventario.',
    productId: '1',
    productName: 'Spaghetti',
    productImage: 'https://images.unsplash.com/photo-1635264685671-739e75e73e0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFnaGV0dGklMjBwYXN0YXxlbnwxfHx8fDE3NTkxODMzOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2025-10-11T18:45:00',
    read: false,
    priority: 'medium'
  },
  {
    id: '4',
    type: 'out-of-stock',
    title: 'Producto agotado',
    message: 'El Pan se ha agotado en tu inventario.',
    productId: '5',
    productName: 'Pan',
    productImage: 'https://images.unsplash.com/photo-1598373182308-3270495d2f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhZCUyMGxvYWZ8ZW58MXx8fHwxNzU5MDY5NTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2025-10-11T14:20:00',
    read: true,
    priority: 'medium'
  },
  {
    id: '5',
    type: 'price-alert',
    title: 'Oferta especial',
    message: 'El Arroz Tío Pelón tiene un 15% de descuento en MásxMenos esta semana.',
    productId: '3',
    productName: 'Arroz',
    productImage: 'https://images.unsplash.com/photo-1719532520316-4cc0d8886ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwYmFnfGVufDF8fHx8MTc1OTE4MzM5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2025-10-11T09:00:00',
    read: true,
    priority: 'low'
  },
  {
    id: '6',
    type: 'reminder',
    title: 'Recordatorio de compra',
    message: 'No olvides comprar los productos de tu lista "Compra Semanal".',
    date: '2025-10-10T16:30:00',
    read: true,
    priority: 'low'
  },
  {
    id: '7',
    type: 'expiring',
    title: 'Producto próximo a vencer',
    message: 'El Spaghetti vence en 3 días. Planifica tus comidas.',
    productId: '1',
    productName: 'Spaghetti',
    productImage: 'https://images.unsplash.com/photo-1635264685671-739e75e73e0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFnaGV0dGklMjBwYXN0YXxlbnwxfHx8fDE3NTkxODMzOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2025-10-10T08:00:00',
    read: true,
    priority: 'medium'
  },
  {
    id: '8',
    type: 'price-alert',
    title: 'Alerta de precio',
    message: 'El precio de la Leche Dos Pinos ha aumentado ₡50 en Automercado.',
    productId: '2',
    productName: 'Leche',
    productImage: 'https://images.unsplash.com/photo-1576186726115-4d51596775d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwYm90dGxlfGVufDF8fHx8MTc1OTE4MzM5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2025-10-09T11:15:00',
    read: true,
    priority: 'low'
  }
];

export const initialPurchases: Purchase[] = [
  {
    id: '1',
    store: 'Walmart',
    date: '2025-10-10T14:30:00',
    invoiceNumber: 'WAL-2025-001234',
    paymentMethod: 'card',
    items: [
      {
        id: '1',
        productName: 'Leche Dos Pinos Entera 1L',
        category: 'Lácteos',
        quantity: 2,
        unit: 'litros',
        price: 1150,
        total: 2300,
        image: 'https://images.unsplash.com/photo-1576186726115-4d51596775d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwYm90dGxlfGVufDF8fHx8MTc1OTE4MzM5OXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '2',
        productName: 'Pan Integral Bimbo',
        category: 'Panadería',
        quantity: 1,
        unit: 'unidades',
        price: 800,
        total: 800,
        image: 'https://images.unsplash.com/photo-1598373182308-3270495d2f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhZCUyMGxvYWZ8ZW58MXx8fHwxNzU5MDY5NTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '3',
        productName: 'Arroz Tío Pelón 1kg',
        category: 'Granos',
        quantity: 2,
        unit: 'kilogramos',
        price: 850,
        total: 1700,
        image: 'https://images.unsplash.com/photo-1719532520316-4cc0d8886ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwYmFnfGVufDF8fHx8MTc1OTE4MzM5OXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '4',
        productName: 'Aceite de Cocina Olitalia',
        category: 'Despensa',
        quantity: 1,
        unit: 'botellas',
        price: 4200,
        total: 4200,
        image: 'https://images.unsplash.com/photo-1662058595162-10e024b1a907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwb2lsJTIwYm90dGxlfGVufDF8fHx8MTc1OTEzMzY0MXww&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    subtotal: 9000,
    tax: 1170,
    total: 10170
  },
  {
    id: '2',
    store: 'Automercado',
    date: '2025-10-05T10:15:00',
    invoiceNumber: 'AUTO-2025-005678',
    paymentMethod: 'card',
    items: [
      {
        id: '1',
        productName: 'Café Britt 500g',
        category: 'Bebidas',
        quantity: 1,
        unit: 'paquetes',
        price: 3200,
        total: 3200,
        image: 'https://images.unsplash.com/photo-1675306408031-a9aad9f23308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFuc3xlbnwxfHx8fDE3NTkwOTQyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '2',
        productName: 'Queso Fresco',
        category: 'Lácteos',
        quantity: 500,
        unit: 'gramos',
        price: 2800,
        total: 2800,
        image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVlc2V8ZW58MXx8fHwxNzU5MDk0MjkxfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '3',
        productName: 'Tomates',
        category: 'Frutas y Verduras',
        quantity: 1,
        unit: 'kilogramos',
        price: 1400,
        total: 1400,
        image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lc3xlbnwxfHx8fDE3NTkwOTQyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    subtotal: 7400,
    tax: 962,
    total: 8362
  },
  {
    id: '3',
    store: 'MásxMenos',
    date: '2025-09-28T16:45:00',
    invoiceNumber: 'MXM-2025-009012',
    paymentMethod: 'cash',
    items: [
      {
        id: '1',
        productName: 'Spaghetti',
        category: 'Granos',
        quantity: 3,
        unit: 'paquetes',
        price: 1500,
        total: 4500,
        image: 'https://images.unsplash.com/photo-1635264685671-739e75e73e0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFnaGV0dGklMjBwYXN0YXxlbnwxfHx8fDE3NTkxODMzOTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '2',
        productName: 'Salsa de Tomate',
        category: 'Despensa',
        quantity: 2,
        unit: 'frascos',
        price: 1200,
        total: 2400,
        image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBzYXVjZXxlbnwxfHx8fDE3NTkwOTQyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '3',
        productName: 'Huevos',
        category: 'Lácteos',
        quantity: 12,
        unit: 'unidades',
        price: 2200,
        total: 2200,
        image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ2dzfGVufDF8fHx8MTc1OTA5NDI5MXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '4',
        productName: 'Pollo Entero',
        category: 'Carnes',
        quantity: 1.5,
        unit: 'kilogramos',
        price: 3800,
        total: 5700,
        image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXclMjBjaGlja2VufGVufDF8fHx8MTc1OTA5NDI5MXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '5',
        productName: 'Lechuga',
        category: 'Frutas y Verduras',
        quantity: 2,
        unit: 'unidades',
        price: 600,
        total: 1200,
        image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZXR0dWNlfGVufDF8fHx8MTc1OTA5NDI5MXww&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    subtotal: 16000,
    tax: 2080,
    total: 18080
  },
  {
    id: '4',
    store: 'Walmart',
    date: '2025-09-20T11:20:00',
    invoiceNumber: 'WAL-2025-001089',
    paymentMethod: 'transfer',
    items: [
      {
        id: '1',
        productName: 'Detergente Líquido',
        category: 'Limpieza',
        quantity: 1,
        unit: 'botellas',
        price: 3500,
        total: 3500,
        image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXRlcmdlbnR8ZW58MXx8fHwxNzU5MDk0MjkxfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '2',
        productName: 'Papel Higiénico',
        category: 'Limpieza',
        quantity: 1,
        unit: 'paquetes',
        price: 4200,
        total: 4200,
        image: 'https://images.unsplash.com/photo-1584556326561-c8746083993b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2lsZXQlMjBwYXBlcnxlbnwxfHx8fDE3NTkwOTQyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '3',
        productName: 'Jabón de Manos',
        category: 'Limpieza',
        quantity: 2,
        unit: 'botellas',
        price: 1800,
        total: 3600,
        image: 'https://images.unsplash.com/photo-1585388606070-7c4e1c3fb0b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kJTIwc29hcHxlbnwxfHx8fDE3NTkwOTQyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    subtotal: 11300,
    tax: 1469,
    total: 12769
  },
  {
    id: '5',
    store: 'Fresh Market',
    date: '2025-09-15T09:30:00',
    invoiceNumber: 'FM-2025-003456',
    paymentMethod: 'card',
    items: [
      {
        id: '1',
        productName: 'Manzanas Importadas',
        category: 'Frutas y Verduras',
        quantity: 2,
        unit: 'kilogramos',
        price: 2500,
        total: 5000,
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsZXN8ZW58MXx8fHwxNzU5MDk0MjkxfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '2',
        productName: 'Plátanos',
        category: 'Frutas y Verduras',
        quantity: 1.5,
        unit: 'kilogramos',
        price: 800,
        total: 1200,
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmFzfGVufDF8fHx8MTc1OTA5NDI5MXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '3',
        productName: 'Yogurt Natural',
        category: 'Lácteos',
        quantity: 4,
        unit: 'unidades',
        price: 900,
        total: 3600,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2d1cnR8ZW58MXx8fHwxNzU5MDk0MjkxfDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    subtotal: 9800,
    tax: 1274,
    total: 11074
  }
];
