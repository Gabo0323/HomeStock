import { CreatePriceHistoryUseCase } from "@/domain/useCases/createPriceHistoryUseCase";
import { GetLastPriceByProductIdUseCase } from "@/domain/useCases/getLastPriceByProductIdUseCase";
import { PriceHistory } from "@/domain/entities/priceHistoryEntity";
import { CreatePriceHistoryDto } from "@/data/dto/priceHistoryDto";

export class PriceHistoryViewModel {
  private createPriceHistoryUseCase: CreatePriceHistoryUseCase;
  private getLastPriceByProductIdUseCase: GetLastPriceByProductIdUseCase;

  priceHistory: PriceHistory | null = null;
  error: string | null = null;
  isLoading = false;

  constructor(
    createPriceHistoryUseCase: CreatePriceHistoryUseCase,
    getLastPriceByProductIdUseCase: GetLastPriceByProductIdUseCase
  ) {
    this.createPriceHistoryUseCase = createPriceHistoryUseCase;
    this.getLastPriceByProductIdUseCase = getLastPriceByProductIdUseCase;
  }

  async createPriceHistory(dto: CreatePriceHistoryDto): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const result = await this.createPriceHistoryUseCase.execute(dto);
      this.priceHistory = result;
    } catch (error: any) {
      console.error("Error en PriceHistoryViewModel.createPriceHistory:", error);
      this.error = error?.message ?? "Error al crear historial de precio";
      this.priceHistory = null;
    } finally {
      this.isLoading = false;
    }
  }

  async getLastPriceByProductId(productId: number): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const result = await this.getLastPriceByProductIdUseCase.execute(productId);
      this.priceHistory = result;
    } catch (error: any) {
      console.error("Error en PriceHistoryViewModel.getLastPriceByProductId:", error);
      this.error = error?.message ?? "Error al obtener historial de precio";
      this.priceHistory = null; // Limpia el estado anterior
    } finally {
      this.isLoading = false;
    }
  }
}
