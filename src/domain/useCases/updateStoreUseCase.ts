import { Store } from "../entities/storeEntity";
import { StoreRepository } from "../repositories/storeRepository";
import { UpdateStoreDto } from "@/data/dto/storeDto";

export class UpdateStoreUseCase {
  private storeRepository: StoreRepository;

  constructor(storeRepository: StoreRepository) {
    this.storeRepository = storeRepository;
  }

  async execute(storeId: number, dto: UpdateStoreDto): Promise<Store> {
    return await this.storeRepository.updateStore(storeId, dto);
  }
}
