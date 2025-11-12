import { Alert } from "@/domain/entities/alertEntity";
import { AlertDto, CreateAlertDto } from "../dto/alertDto";

// Convierte del backend (DTO) → entidad del dominio
export function mapDtoToAlert(dto: any): Alert {
  return {
    id: dto.id,
    userId: dto.userId,
    productId: dto.productId,
    type: dto.type, // 'LOW_STOCK' | 'EXPIRY'
    message: dto.message,
    triggerAt: dto.triggerAt,
    active: dto.active,
    resolvedAt: dto.resolvedAt,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

// Convierte del dominio → DTO para creación
export function mapAlertToCreateDto(alert: Alert): CreateAlertDto {
  return {
    userId: alert.userId,
    productId: alert.productId,
    type: alert.type,
    message: alert.message ?? "",
    triggerAt: alert.triggerAt,
    active: alert.active,
  };
}
