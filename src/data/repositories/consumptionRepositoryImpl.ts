import { Consumption } from "@/domain/entities/consumptionEntity";
import { ConsumptionRepository } from "@/domain/repositories/consumptionRepository";
import { ConsumptionRemoteDataSource } from "../datasources/consumptionRemoteDataSource";
import { RegisterConsumptionDto } from "../dto/consumptionDto";
import { mapDtoToConsumption } from "../mapper/consumptionMapper";

export class ConsumptionRepositoryImpl implements ConsumptionRepository {
  private remoteDataSource: ConsumptionRemoteDataSource;

  constructor(remoteDataSource: ConsumptionRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async registerConsumption(dto: RegisterConsumptionDto): Promise<Consumption> {
    try {
      const result = await this.remoteDataSource.registerConsumption(dto);
      return mapDtoToConsumption(result);
    } catch (error) {
      console.error("Error en ConsumptionRepositoryImpl.registerConsumption:", error);
      throw error;
    }
  }
}
