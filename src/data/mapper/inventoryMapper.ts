
// ======================================================
// DTO → ENTITY (mapDtoToInventoryItem)

import { AddStockEntryDto, BulkConsumeDto, CreateInventoryItemDto, InventoryItemEntity, TransferStockDto } from "../dto/inventoryDto";

// ======================================================
export function mapDtoToInventoryItem(dto: any): InventoryItemEntity {
  return {
    id: dto.id,
    userId: dto.userId,
    name: dto.name,
    categoryId: dto.categoryId,
    quantity: dto.quantity,
    minStock: dto.minStock ?? 0,
    acquisitionDate: dto.acquisitionDate,
    expiryDate: dto.expiryDate,
    price: dto.price,
    purchaseLocationId: dto.purchaseLocationId,
    brand: dto.brand,
    imageUrl: dto.imageUrl,
    barcode: dto.barcode,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

// ======================================================
// ENTITY → DTO PARA CREAR (POST /inventory)
// (mapInventoryItemToCreateDto)
// ======================================================
export function mapInventoryItemToCreateDto(
  item: InventoryItemEntity,
): CreateInventoryItemDto {
  return {
    userId: item.userId,
    name: item.name,
    categoryId: item.categoryId,
    quantity: item.quantity,
    minStock: item.minStock,
    acquisitionDate: item.acquisitionDate || undefined,
    expiryDate: item.expiryDate || undefined,
    price: item.price || undefined,
    purchaseLocationId: item.purchaseLocationId || undefined,
    brand: item.brand || undefined,
    imageUrl: item.imageUrl || undefined,
    barcode: item.barcode || undefined
  };
}

// ======================================================
// ENTITY → DTO PARA AGREGAR STOCK (AddStockEntryDto)
// ======================================================
export function mapInventoryItemToAddStockDto(
  item: InventoryItemEntity,
): AddStockEntryDto {
  return {
    userId: item.userId,
    productId: item.id, // Usar el ID como productId
    quantity: item.quantity,
    purchaseLocationId: item.purchaseLocationId || undefined
  };
}

// ======================================================
// DTO PARA BULK CONSUME (POST /inventory/bulk/consume)
// ======================================================
export function mapBulkConsumeToRequest(dto: BulkConsumeDto) {
  return {
    userId: dto.userId,
    items: dto.items.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
    })),
  };
}

// ======================================================
// DTO PARA TRANSFER (POST /inventory/transfers)
// ======================================================
export function mapTransferToRequest(dto: TransferStockDto) {
  return {
    userId: dto.userId,
    productId: dto.productId,
    fromLocationId: dto.fromLocationId,
    toLocationId: dto.toLocationId,
    quantity: dto.quantity,
  };
}
