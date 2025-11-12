import { MovementRepository } from "../repositories/movementRepository";
import { CreateMovementDto } from "@/data/dto/movementDto";
import { Movement } from "../entities/movementEntity";

export class CreateMovementUseCase {
  private movementRepository: MovementRepository;

  constructor(movementRepository: MovementRepository) {
    this.movementRepository = movementRepository;
  }

  async execute(dto: CreateMovementDto): Promise<Movement> {
    return await this.movementRepository.createMovement(dto);
  }
}
