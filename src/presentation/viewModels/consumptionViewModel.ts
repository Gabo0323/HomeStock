import { makeAutoObservable } from "mobx";
import { Consumption } from "@/domain/entities/consumptionEntity";
import { RegisterConsumptionDto } from "@/data/dto/consumptionDto";
import { RegisterConsumptionUseCase } from "@/domain/useCases/registerConsumptionUseCase";

export class ConsumptionViewModel {
  private registerConsumptionUseCase: RegisterConsumptionUseCase;

  consumption: Consumption | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(registerConsumptionUseCase: RegisterConsumptionUseCase) {
    makeAutoObservable(this);
    this.registerConsumptionUseCase = registerConsumptionUseCase;
  }

  async registerConsumption(dto: RegisterConsumptionDto) {
    this.loading = true;
    this.error = null;
    try {
      this.consumption = await this.registerConsumptionUseCase.execute(dto);
    } catch (err: any) {
      this.error = err.message || "Error al registrar consumo";
    } finally {
      this.loading = false;
    }
  }
}
