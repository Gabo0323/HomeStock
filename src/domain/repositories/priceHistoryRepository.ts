import { CreatePriceHistoryDto, PriceHistoryDto } from "../../data/dto/priceHistoryDto";
import { PriceHistory } from "../entities/priceHistoryEntity";

export interface PriceHistoryRepository {
  createPriceHistory(dto: CreatePriceHistoryDto): Promise<PriceHistory>;
  getLastPriceByProductId(productId: number): Promise<PriceHistory>;
}
