import { Store } from "../entities/storeEntity";
import { StoreRepository } from "../repositories/storeRepository";

export class GetStoresUseCase {
  private storeRepository: StoreRepository;

  constructor(storeRepository: StoreRepository) {
    this.storeRepository = storeRepository;
  }

  async execute(): Promise<Store[]> {
    return await this.storeRepository.getAllStores();
  }
}
