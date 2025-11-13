import { makeAutoObservable } from "mobx";

import { Store } from "@/domain/entities/storeEntity";
import { CreateStoreDto, UpdateStoreDto } from "@/data/dto/storeDto";

import { GetStoresUseCase } from "@/domain/useCases/getStoresUseCase";
import { CreateStoreUseCase } from "@/domain/useCases/createStoreUseCase";
import { UpdateStoreUseCase } from "@/domain/useCases/updateStoreUseCase";
import { DeleteStoreUseCase } from "@/domain/useCases/deleteStoreUseCase";

export class StoreViewModel {
  private getStoresUseCase: GetStoresUseCase;
  private createStoreUseCase: CreateStoreUseCase;
  private updateStoreUseCase: UpdateStoreUseCase;
  private deleteStoreUseCase: DeleteStoreUseCase;

  stores: Store[] = [];
  store: Store | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    getStoresUseCase: GetStoresUseCase,
    createStoreUseCase: CreateStoreUseCase,
    updateStoreUseCase: UpdateStoreUseCase,
    deleteStoreUseCase: DeleteStoreUseCase
  ) {
    makeAutoObservable(this);
    this.getStoresUseCase = getStoresUseCase;
    this.createStoreUseCase = createStoreUseCase;
    this.updateStoreUseCase = updateStoreUseCase;
    this.deleteStoreUseCase = deleteStoreUseCase;
  }

  // GET ALL STORES

  async getStores() {
    this.loading = true;
    this.error = null;

    try {
      this.stores = await this.getStoresUseCase.execute();
    } catch (err: any) {
      this.error = err.message || "Error al obtener stores";
    } finally {
      this.loading = false;
    }
  }

  // CREATE STORE

  async createStore(dto: CreateStoreDto) {
    this.loading = true;
    this.error = null;

    try {
      const newStore = await this.createStoreUseCase.execute(dto);
      this.store = newStore;

      // agregar a la lista
      this.stores.push(newStore);
    } catch (err: any) {
      this.error = err.message || "Error al crear store";
    } finally {
      this.loading = false;
    }
  }

  // UPDATE STORE

  async updateStore(storeId: number, dto: UpdateStoreDto) {
    this.loading = true;
    this.error = null;

    try {
      const updated = await this.updateStoreUseCase.execute(storeId, dto);
      this.store = updated;

      // actualizar en la lista
      this.stores = this.stores.map((s) =>
        s.id === storeId ? updated : s
      );
    } catch (err: any) {
      this.error = err.message || "Error al actualizar store";
    } finally {
      this.loading = false;
    }
  }

  // DELETE STORE

  async deleteStore(storeId: number) {
    this.loading = true;
    this.error = null;

    try {
      await this.deleteStoreUseCase.execute(storeId);

      // remover de la lista
      this.stores = this.stores.filter((s) => s.id !== storeId);

      // si es el seleccionado, limpiarlo
      if (this.store?.id === storeId) {
        this.store = null;
      }
    } catch (err: any) {
      this.error = err.message || "Error al eliminar store";
    } finally {
      this.loading = false;
    }
  }
}
