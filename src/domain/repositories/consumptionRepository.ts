import { RegisterConsumptionDto } from "@/data/dto/consumptionDto";
import { Consumption } from "../entities/consumptionEntity";

export interface ConsumptionRepository {
  registerConsumption(dto: RegisterConsumptionDto): Promise<Consumption>;
}
