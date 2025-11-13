import { InventoryRepository } from "@/domain/repositories/inventoryRepository";
import { InventoryRemoteDataSource } from "../datasources/inventoryRemoteDataSource";
import { ProductRemoteDataSource } from "../datasources/productRemoteDataSource";
import { CreateInventoryItemDto } from "../dto/inventoryDto";

export class InventoryRepositoryImpl implements InventoryRepository {
  constructor(
    private remote: InventoryRemoteDataSource,
    private productRemote: ProductRemoteDataSource
  ) {}

  async getInventory(page: number, size: number) {
    return await this.remote.getInventory(page, size);
  }

  async createInventoryItem(productId: number, quantity: number, purchaseLocationId?: number) {
    try {
      // 🔧 WORKAROUND: Obtener datos del producto para backend mal diseñado
      console.warn('⚠️ WORKAROUND: Obteniendo datos del producto para backend legacy');
      const product = await this.productRemote.getProductById(productId);
      
      // 🔧 Mapear datos como espera el backend actual (aunque esté mal diseñado)
      const inventoryItemDto: CreateInventoryItemDto = {
        userId: product.userId,
        name: `${product.name} - Stock ${Date.now()}`, // ✅ Hacer nombre único para evitar duplicados
        categoryId: product.categoryId,
        quantity: quantity,
        minStock: product.minStock || 1,
        acquisitionDate: new Date().toISOString().split('T')[0],
        price: product.price,
        purchaseLocationId: purchaseLocationId || product.purchaseLocationId,
        brand: product.brand,
        imageUrl: product.imageUrl,
        barcode: product.barcode
      };

      console.log('📦 WORKAROUND: Enviando datos completos al backend legacy:', inventoryItemDto);
      return await this.remote.createInventoryItem(inventoryItemDto);
    } catch (error) {
      console.error("Error en InventoryRepositoryImpl.createInventoryItem:", error);
      throw error;
    }
  }

  async bulkConsume(userId: number, items: { productId: number; quantity: number }[]) {
    return await this.remote.bulkConsume({ userId, items });
  }

  async transferStock(userId: number, productId: number, fromLocationId: number, toLocationId: number, quantity: number) {
    return await this.remote.transferStock({
      userId,
      productId,
      fromLocationId,
      toLocationId,
      quantity
    });
  }
}