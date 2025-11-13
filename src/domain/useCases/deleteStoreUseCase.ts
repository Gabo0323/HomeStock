import { StoreRepository } from "../repositories/storeRepository";

export class DeleteStoreUseCase {
  private storeRepository: StoreRepository;

  constructor(storeRepository: StoreRepository) {
    this.storeRepository = storeRepository;
  }

  async execute(storeId: number): Promise<boolean> {
    return await this.storeRepository.deleteStore(storeId);
  }
}
