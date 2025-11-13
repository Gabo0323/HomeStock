import { Store } from "../entities/storeEntity";
import { StoreRepository } from "../repositories/storeRepository";
import { CreateStoreDto } from "@/data/dto/storeDto";

export class CreateStoreUseCase {
  private storeRepository: StoreRepository;

  constructor(storeRepository: StoreRepository) {
    this.storeRepository = storeRepository;
  }

  async execute(dto: CreateStoreDto): Promise<Store> {
    return await this.storeRepository.createStore(dto);
  }
}
