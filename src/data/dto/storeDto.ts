export interface StoreDto {
  id: number;
  name: string;
  location: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStoreDto {
  name: string;
  location: string;
  notes?: string;
}

export interface UpdateStoreDto {
  notes?: string;
}

export type StoreListResponse = StoreDto[];