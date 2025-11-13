export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expirationDate: string;
  price: number;
  brand: string;
  store: string;
  image: string;
  barcode?: string;
  status: 'good' | 'warning' | 'low' | 'expired';
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingListItem[];
  createdAt: string;
}

export interface ShoppingListItem {
  id: string;
  productName: string;
  quantity: number;
  checked: boolean;
  category: string;
}

export interface ProductComparison {
  productName: string;
  stores: {
    name: string;
    price: number;
    rating: number;
  }[];
}

export interface ProductRating {
  productId: string;
  productName: string;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}

export interface Notification {
  id: string;
  type: 'expiring' | 'expired' | 'low-stock' | 'out-of-stock' | 'price-alert' | 'reminder';
  title: string;
  message: string;
  productId?: string;
  productName?: string;
  productImage?: string;
  date: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface PurchaseItem {
  id: string;
  productName: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
  image: string;
}

export interface Purchase {
  id: string;
  store: string;
  date: string;
  items: PurchaseItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'transfer';
  invoiceNumber: string;
}

export const CATEGORIES = [
  'Todos',
  'Lácteos',
  'Granos',
  'Bebidas',
  'Panadería',
  'Carnes',
  'Frutas y Verduras',
  'Despensa',
  'Snacks',
  'Limpieza'
];

export const STORES = [
  'Walmart',
  'Automercado',
  'MásxMenos',
  'Palí',
  'Fresh Market',
  'Megasuper'
];
