export interface ProductDto {
  id: number;
  userId: number;
  name: string;
  categoryId: number;
  quantity: number;
  minStock: number;
  acquisitionDate: string;
  price: number;
  purchaseLocationId: number;
  brand: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDto {
  userId: number;
  name: string;
  categoryId: number;
  quantity: number;
  minStock?: number;
  price: number;
  brand?: string;
  barcode: string;
}

export interface UpdateProductDto{
  minStock: number;
}

export interface ProductListDto {
  products: ProductDto[];
}
