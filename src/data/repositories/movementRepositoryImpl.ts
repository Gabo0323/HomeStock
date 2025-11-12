import { Movement } from "@/domain/entities/movementEntity";
import { MovementRepository } from "@/domain/repositories/movementRepository";
import { MovementRemoteDataSource } from "@/data/datasources/movementRemoteDataSource";
import { CreateMovementDto, MovementDto } from "@/data/dto/movementDto";
import { mapDtoToMovement } from "@/data/mapper/movementMapper";

export class MovementRepositoryImpl implements MovementRepository {
  private remoteDataSource: MovementRemoteDataSource;

  constructor(remoteDataSource: MovementRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async createMovement(dto: CreateMovementDto): Promise<Movement> {
    try {
      const result: MovementDto = await this.remoteDataSource.createMovement(dto);
      return mapDtoToMovement(result);
    } catch (error) {
      console.error("Error en MovementRepositoryImpl.createMovement:", error);
      throw error;
    }
  }
}
