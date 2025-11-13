import { Store } from "@/domain/entities/storeEntity";
import { CreateStoreDto, UpdateStoreDto } from "@/data/dto/storeDto";

export interface StoreRepository {
  getAllStores(): Promise<Store[]>;
  createStore(dto: CreateStoreDto): Promise<Store>;
  updateStore(storeId: number, dto: UpdateStoreDto): Promise<Store>;
  deleteStore(storeId: number): Promise<boolean>;
}