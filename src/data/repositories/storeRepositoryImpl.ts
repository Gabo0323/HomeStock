import { Store } from "@/domain/entities/storeEntity";
import { StoreRepository } from "@/domain/repositories/storeRepository";
import { StoreRemoteDataSource } from "../datasources/storeRemoteDataSource";
import { CreateStoreDto, UpdateStoreDto, StoreDto } from "../dto/storeDto";
import { StoreMapper } from "../mapper/storeMapper";

export class StoreRepositoryImpl implements StoreRepository {
  private remoteDataSource: StoreRemoteDataSource;

  constructor(remoteDataSource: StoreRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async getAllStores(): Promise<Store[]> {
    try {
      const result = await this.remoteDataSource.getAllStores();
      return StoreMapper.fromDtoList(result);
    } catch (error) {
      console.error("Error en StoreRepositoryImpl.getAllStores:", error);
      throw error;
    }
  }

  async createStore(dto: CreateStoreDto): Promise<Store> {
    try {
      const result = await this.remoteDataSource.createStore(dto);
      return StoreMapper.fromDto(result);
    } catch (error) {
      console.error("Error en StoreRepositoryImpl.createStore:", error);
      throw error;
    }
  }

  async updateStore(storeId: number, dto: UpdateStoreDto): Promise<Store> {
    try {
      const result = await this.remoteDataSource.updateStore(storeId, dto);
      return StoreMapper.fromDto(result);
    } catch (error) {
      console.error("Error en StoreRepositoryImpl.updateStore:", error);
      throw error;
    }
  }

  async deleteStore(storeId: number): Promise<boolean> {
    try {
      return await this.remoteDataSource.deleteStore(storeId);
    } catch (error) {
      console.error("Error en StoreRepositoryImpl.deleteStore:", error);
      throw error;
    }
  }
}
