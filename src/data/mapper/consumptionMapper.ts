import { Consumption } from "@/domain/entities/consumptionEntity";
import { ConsumptionDto } from "../dto/consumptionDto";

export function mapDtoToConsumption(dto: ConsumptionDto): Consumption {
  return {
    id: dto.id,
    userId: dto.userId,
    productId: dto.productId,
    type: dto.type,
    quantity: dto.quantity,
    note: dto.note,
    occurredAt: dto.occurredAt,
    createdAt: dto.createdAt,
  };
}
