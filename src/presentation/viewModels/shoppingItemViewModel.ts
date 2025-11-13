import type {
  CreateShoppingItemDto,
  UpdateShoppingItemDto,
} from "@/data/dto/shoppingItemDto";
import type { ShoppingItem } from "@/domain/entities/shoppingItemEntity";
import { CreateShoppingItemUseCase } from "@/domain/useCases/createShoppingItemUseCase";
import { GetPendingShoppingItemsUseCase } from "@/domain/useCases/getPendingShoppingItemsUseCase";
import { UpdateShoppingItemUseCase } from "@/domain/useCases/updateShoppingItemUseCase";
import { makeAutoObservable } from "mobx";

export class ShoppingItemViewModel {
  private readonly createShoppingItemUseCase: CreateShoppingItemUseCase;
  private readonly getPendingShoppingItemsUseCase: GetPendingShoppingItemsUseCase;
  private readonly updateShoppingItemUseCase: UpdateShoppingItemUseCase;

  shoppingItems: ShoppingItem[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    createShoppingItemUseCase: CreateShoppingItemUseCase,
    getPendingShoppingItemsUseCase: GetPendingShoppingItemsUseCase,
    updateShoppingItemUseCase: UpdateShoppingItemUseCase,
  ) {
    makeAutoObservable(this);
    this.createShoppingItemUseCase = createShoppingItemUseCase;
    this.getPendingShoppingItemsUseCase = getPendingShoppingItemsUseCase;
    this.updateShoppingItemUseCase = updateShoppingItemUseCase;
  }

  private upsertShoppingItem(item: ShoppingItem) {
    const exists = this.shoppingItems.some((existing) => existing.id === item.id);
    if (exists) {
      this.shoppingItems = this.shoppingItems.map((existing) =>
        existing.id === item.id ? item : existing,
      );
    } else {
      this.shoppingItems = [...this.shoppingItems, item];
    }
  }

  async createShoppingItem(dto: CreateShoppingItemDto) {
    this.loading = true;
    this.error = null;
    try {
      const createdItem = await this.createShoppingItemUseCase.execute(dto);
      this.upsertShoppingItem(createdItem);
    } catch (err: any) {
      this.error = err.message || "Error al crear shopping item";
    } finally {
      this.loading = false;
    }
  }

  async loadPendingShoppingItems(userId: number) {
    this.loading = true;
    this.error = null;
    try {
      this.shoppingItems = await this.getPendingShoppingItemsUseCase.execute(userId);
    } catch (err: any) {
      this.error = err.message || "Error al cargar shopping items pendientes";
    } finally {
      this.loading = false;
    }
  }

  async updateShoppingItem(shoppingItemId: number, dto: UpdateShoppingItemDto) {
    this.loading = true;
    this.error = null;
    try {
      const updatedItem = await this.updateShoppingItemUseCase.execute(shoppingItemId, dto);
      this.upsertShoppingItem(updatedItem);
    } catch (err: any) {
      this.error = err.message || "Error al actualizar shopping item";
    } finally {
      this.loading = false;
    }
  }
}
