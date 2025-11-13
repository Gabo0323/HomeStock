import { Consumption } from "../entities/consumptionEntity";
import { RegisterConsumptionDto } from "@/data/dto/consumptionDto";
import { ConsumptionRepository } from "../repositories/consumptionRepository";

export class RegisterConsumptionUseCase {
  private repository: ConsumptionRepository;

  constructor(repository: ConsumptionRepository) {
    this.repository = repository;
  }

  async execute(dto: RegisterConsumptionDto): Promise<Consumption> {
    return await this.repository.registerConsumption(dto);
  }
}
