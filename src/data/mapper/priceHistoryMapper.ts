import { PriceHistory } from "@/domain/entities/priceHistoryEntity";
import { CreatePriceHistoryDto, PriceHistoryDto } from "../dto/priceHistoryDto";

/**
 * 🔁 Convierte un DTO recibido desde el backend en una entidad del dominio
 */
export function mapDtoToPriceHistory(dto: PriceHistoryDto): PriceHistory {
  return {
    id: dto.id,
    productId: dto.productId,
    unitPrice: dto.unitPrice,
    storeId: dto.storeId,
    recordedAt: dto.recordedAt,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

/**
 * 🔁 Convierte una entidad o datos locales a un DTO para enviar al backend
 */
export function mapPriceHistoryToCreateDto(
  entity: PriceHistory
): CreatePriceHistoryDto {
  return {
    productId: entity.productId,
    unitPrice: entity.unitPrice,
    storeId: entity.storeId ?? 0,
    recordedAt: entity.recordedAt,
  };
}
