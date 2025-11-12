import { CreateMovementDto, MovementDto } from "../../data/dto/movementDto";
import { Movement } from "../entities/movementEntity";

export interface MovementRepository {
  createMovement(dto: CreateMovementDto): Promise<Movement>;
}
