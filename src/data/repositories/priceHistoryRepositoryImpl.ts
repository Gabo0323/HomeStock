import { PriceHistory } from "@/domain/entities/priceHistoryEntity";
import { PriceHistoryRepository } from "@/domain/repositories/priceHistoryRepository";
import { CreatePriceHistoryDto, PriceHistoryDto } from "../dto/priceHistoryDto";
import { mapDtoToPriceHistory } from "../mapper/priceHistoryMapper";
import { PriceHistoryRemoteDataSource } from "../datasources/priceHistoryRemoteDaaSource";

export class PriceHistoryRepositoryImpl implements PriceHistoryRepository {
  private remoteDataSource: PriceHistoryRemoteDataSource;

  constructor(remoteDataSource: PriceHistoryRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async createPriceHistory(dto: CreatePriceHistoryDto): Promise<PriceHistory> {
    try {
      const result = await this.remoteDataSource.createPriceHistory(dto);
      return mapDtoToPriceHistory(result);
    } catch (error) {
      console.error("Error en PriceHistoryRepositoryImpl.createPriceHistory:", error);
      throw error;
    }
  }

  async getLastPriceByProductId(productId: number): Promise<PriceHistory> {
    try {
      const result = await this.remoteDataSource.getLastPriceHistoryByProductId(productId);
      return mapDtoToPriceHistory(result);
    } catch (error) {
      console.error("Error en PriceHistoryRepositoryImpl.getLastPriceByProductId:", error);
      throw error;
    }
  }
}
