import { Store } from "@/domain/entities/storeEntity";
import { StoreDto, CreateStoreDto, UpdateStoreDto } from "../dto/storeDto";

export class StoreMapper {
  // Convierte StoreDto (API) → Store (Dominio)
  
  static fromDto(dto: StoreDto): Store {
    return {
      id: dto.id,
      name: dto.name,
      location: dto.location ?? "",
      notes: dto.notes ?? "",
      createdAt: dto.createdAt instanceof Date ? dto.createdAt.toISOString() : String(dto.createdAt),
      updatedAt: dto.updatedAt instanceof Date ? dto.updatedAt.toISOString() : String(dto.updatedAt)
    };
  }

  // Convierte un array de StoreDto → array de Store
  static fromDtoList(dtoList: StoreDto[]): Store[] {
    return dtoList.map((dto) => StoreMapper.fromDto(dto));
  }

  // Convierte CreateStoreDto (Dominio) → body para API
 
  static toCreateDto(store: CreateStoreDto) {
    return {
      name: store.name,
      location: store.location,
      notes: store.notes ?? ""
    };
  }

  // Convierte UpdateStoreDto (Dominio) → body para API
 
  static toUpdateDto(store: UpdateStoreDto) {
    return {
      ...store
    };
  }
}
