import { BulkConsumeUseCase } from "@/domain/useCases/bulkConsumeUseCase";
import { CreateInventoryItemUseCase } from "@/domain/useCases/createInventoryItemUseCase";
import { GetInventoryPageUseCase } from "@/domain/useCases/getInventoryPageUseCase";
import { TransferStockUseCase } from "@/domain/useCases/transferStockUseCase";
import { makeAutoObservable } from "mobx";

export class InventoryViewModel {
  inventory: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private readonly getInventoryPageUseCase: GetInventoryPageUseCase,
    private readonly createInventoryItemUseCase: CreateInventoryItemUseCase,
    private readonly bulkConsumeUseCase: BulkConsumeUseCase,
    private readonly transferStockUseCase: TransferStockUseCase
  ) {
    makeAutoObservable(this);
  }

  async loadInventory(page: number = 0, size: number = 1000) {
    try {
      this.loading = true;
      this.error = null;
      
      console.log('🔄 Cargando inventario...', { page, size });
      
      const items = await this.getInventoryPageUseCase.execute(page, size);
      
      console.log('📦 Inventario cargado:', items);

      // aseguramos que sea array
      this.inventory = Array.isArray(items) ? items : [];
      
      console.log('✅ Inventario actualizado:', this.inventory.length, 'items');
    } catch (error: any) {
      this.error = error?.message || 'Error cargando inventario';
      console.error('❌ Error cargando inventario:', error);
      this.inventory = [];
    } finally {
      this.loading = false;
    }
  }


  async createItem(productId: number, quantity: number) {
    this.loading = true;
    this.error = null;

    try {
      const created = await this.createInventoryItemUseCase.execute(productId, quantity);

      console.log("✨ Item agregado al inventario:", created);

      return created; 
    } catch (err: any) {
      this.error = err.message;
      throw err;
    } finally {
      this.loading = false;
    }
  }

  async bulkConsume(userId: number, items: { productId: number; quantity: number }[]) {
    try {
      await this.bulkConsumeUseCase.execute(userId, items);
      console.log("🔑 Consumo masivo realizado correctamente");
    } catch (err: any) {
      this.error = err.message;
    }
  }

  async transferStock(userId: number, productId: number, fromLocationId: number, toLocationId: number, quantity: number) {
    try {
      await this.transferStockUseCase.execute(
        userId, productId, fromLocationId, toLocationId, quantity
      );
      console.log("🔁 Transferencia de stock realizada correctamente");
    } catch (err: any) {
      this.error = err.message;
    }
  }
}
