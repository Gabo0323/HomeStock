import { Movement, MovementType } from "../../domain/entities/movementEntity";
import { MovementDto, CreateMovementDto } from "../dto/movementDto";

export const mapDtoToMovement = (dto: MovementDto): Movement => ({
  id: dto.id,
  userId: dto.userId,
  productId: dto.productId,
  type: dto.type as MovementType,
  quantity: dto.quantity,
  unitPrice: dto.unitPrice,
  storeId: dto.storeId,
  note: dto.note,
  occurredAt: dto.occurredAt,
  createdAt: dto.createdAt,
});

export const mapCreateDtoToMovement = (
  dto: CreateMovementDto,
  generatedId: number,
  createdAt: string
): Movement => ({
  id: generatedId,
  userId: dto.userId,
  productId: dto.productId,
  type: dto.type as MovementType,
  quantity: dto.quantity,
  unitPrice: dto.unitPrice,
  storeId: dto.storeId,
  note: dto.note,
  occurredAt: dto.occurredAt,
  createdAt,
});
