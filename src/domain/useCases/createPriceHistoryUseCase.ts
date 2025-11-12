import { PriceHistoryRepository } from "../repositories/priceHistoryRepository";
import { PriceHistory } from "../entities/priceHistoryEntity";
import { CreatePriceHistoryDto } from "@/data/dto/priceHistoryDto";

export class CreatePriceHistoryUseCase {
  private priceHistoryRepository: PriceHistoryRepository;

  constructor(priceHistoryRepository: PriceHistoryRepository) {
    this.priceHistoryRepository = priceHistoryRepository;
  }

  async execute(dto: CreatePriceHistoryDto): Promise<PriceHistory> {
    return await this.priceHistoryRepository.createPriceHistory(dto);
  }
}
