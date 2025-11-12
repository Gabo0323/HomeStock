import { PriceHistoryRepository } from "../repositories/priceHistoryRepository";
import { PriceHistory } from "../entities/priceHistoryEntity";

export class GetLastPriceByProductIdUseCase {
  private priceHistoryRepository: PriceHistoryRepository;

  constructor(priceHistoryRepository: PriceHistoryRepository) {
    this.priceHistoryRepository = priceHistoryRepository;
  }

  async execute(productId: number): Promise<PriceHistory> {
    return await this.priceHistoryRepository.getLastPriceByProductId(productId);
  }
}