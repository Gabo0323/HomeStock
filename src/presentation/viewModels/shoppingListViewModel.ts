import type {
  AddItemToShoppingListDto,
  CreateShoppingListDto,
  UpdateShoppingListItemDto,
} from "@/data/dto/shoppingListDto";
import type { ShoppingList, ShoppingListItem } from "@/domain/entities/shoppinListEntity";
import type { ShoppingListWithItems } from "@/domain/repositories/shoppingListRepository";
import { AddItemToShoppingListUseCase } from "@/domain/useCases/addItemToShoppingListUseCase";
import { ConvertShoppingListToPurchaseUseCase } from "@/domain/useCases/convertShoppingListToPurchaseUseCase";
import { CreateShoppingListUseCase } from "@/domain/useCases/createShoppingListUseCase";
import { GenerateItemsFromLowStockUseCase } from "@/domain/useCases/generateItemsFromLowStockUseCase";
import { GetShoppingListByIdUseCase } from "@/domain/useCases/getShoppingListByIdUseCase";
import { GetShoppingListsByUserIdUseCase } from "@/domain/useCases/getShoppingListsByUserIdUseCase";
import { UpdateShoppingListItemUseCase } from "@/domain/useCases/updateShoppingListItemUseCase";
import { makeAutoObservable } from "mobx";

export class ShoppingListViewModel {
  private readonly createShoppingListUseCase: CreateShoppingListUseCase;
  private readonly getShoppingListsByUserIdUseCase: GetShoppingListsByUserIdUseCase;
  private readonly getShoppingListByIdUseCase: GetShoppingListByIdUseCase;
  private readonly addItemToShoppingListUseCase: AddItemToShoppingListUseCase;
  private readonly updateShoppingListItemUseCase: UpdateShoppingListItemUseCase;
  private readonly generateItemsFromLowStockUseCase: GenerateItemsFromLowStockUseCase;
  private readonly convertShoppingListToPurchaseUseCase: ConvertShoppingListToPurchaseUseCase;

  shoppingLists: ShoppingList[] = [];
  selectedShoppingList: ShoppingList | null = null;
  selectedShoppingListItems: ShoppingListItem[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    createShoppingListUseCase: CreateShoppingListUseCase,
    getShoppingListsByUserIdUseCase: GetShoppingListsByUserIdUseCase,
    getShoppingListByIdUseCase: GetShoppingListByIdUseCase,
    addItemToShoppingListUseCase: AddItemToShoppingListUseCase,
    updateShoppingListItemUseCase: UpdateShoppingListItemUseCase,
    generateItemsFromLowStockUseCase: GenerateItemsFromLowStockUseCase,
    convertShoppingListToPurchaseUseCase: ConvertShoppingListToPurchaseUseCase,
  ) {
    makeAutoObservable(this);
    this.createShoppingListUseCase = createShoppingListUseCase;
    this.getShoppingListsByUserIdUseCase = getShoppingListsByUserIdUseCase;
    this.getShoppingListByIdUseCase = getShoppingListByIdUseCase;
    this.addItemToShoppingListUseCase = addItemToShoppingListUseCase;
    this.updateShoppingListItemUseCase = updateShoppingListItemUseCase;
    this.generateItemsFromLowStockUseCase = generateItemsFromLowStockUseCase;
    this.convertShoppingListToPurchaseUseCase = convertShoppingListToPurchaseUseCase;
  }

  private upsertShoppingList(shoppingList: ShoppingList) {
    const index = this.shoppingLists.findIndex((list) => list.id === shoppingList.id);
    if (index >= 0) {
      this.shoppingLists[index] = shoppingList;
    } else {
      this.shoppingLists.push(shoppingList);
    }
  }

  private handleDetail(detail: ShoppingListWithItems) {
    const { items, ...shoppingList } = detail;
    this.selectedShoppingList = shoppingList;
    this.selectedShoppingListItems = items;
    this.upsertShoppingList(shoppingList);
  }

  async createShoppingList(dto: CreateShoppingListDto) {
    this.loading = true;
    this.error = null;
    try {
      const shoppingList = await this.createShoppingListUseCase.execute(dto);
      this.upsertShoppingList(shoppingList);
      if (!this.selectedShoppingList) {
        this.selectedShoppingList = shoppingList;
        this.selectedShoppingListItems = [];
      }
    } catch (err: any) {
      this.error = err?.message ?? "Error al crear la lista de compras";
    } finally {
      this.loading = false;
    }
  }

  async getShoppingListsByUserId(userId: number) {
    this.loading = true;
    this.error = null;
    try {
      this.shoppingLists = await this.getShoppingListsByUserIdUseCase.execute(userId);
    } catch (err: any) {
      this.error = err?.message ?? "Error al obtener las listas de compras";
    } finally {
      this.loading = false;
    }
  }

  async getShoppingListById(shoppingListId: number) {
    this.loading = true;
    this.error = null;
    try {
      const detail = await this.getShoppingListByIdUseCase.execute(shoppingListId);
      this.handleDetail(detail);
    } catch (err: any) {
      this.error = err?.message ?? "Error al obtener el detalle de la lista de compras";
    } finally {
      this.loading = false;
    }
  }

  async addItemToShoppingList(shoppingListId: number, dto: AddItemToShoppingListDto) {
    this.loading = true;
    this.error = null;
    try {
      const item = await this.addItemToShoppingListUseCase.execute(shoppingListId, dto);
      this.selectedShoppingListItems = [...this.selectedShoppingListItems, item];
    } catch (err: any) {
      this.error = err?.message ?? "Error al agregar un producto a la lista de compras";
    } finally {
      this.loading = false;
    }
  }

  async updateShoppingListItem(
    shoppingListId: number,
    shoppingListItemId: number,
    dto: UpdateShoppingListItemDto,
  ) {
    this.loading = true;
    this.error = null;
    try {
      const updatedItem = await this.updateShoppingListItemUseCase.execute(
        shoppingListId,
        shoppingListItemId,
        dto,
      );
      this.selectedShoppingListItems = this.selectedShoppingListItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item,
      );
    } catch (err: any) {
      this.error = err?.message ?? "Error al actualizar un producto de la lista de compras";
    } finally {
      this.loading = false;
    }
  }

  async generateItemsFromLowStock(shoppingListId: number) {
    this.loading = true;
    this.error = null;
    try {
      const detail = await this.generateItemsFromLowStockUseCase.execute(shoppingListId);
      this.handleDetail(detail);
    } catch (err: any) {
      this.error = err?.message ?? "Error al generar productos por bajo inventario";
    } finally {
      this.loading = false;
    }
  }

  async convertListToPurchase(shoppingListId: number) {
    this.loading = true;
    this.error = null;
    try {
      const detail = await this.convertShoppingListToPurchaseUseCase.execute(shoppingListId);
      this.handleDetail(detail);
    } catch (err: any) {
      this.error = err?.message ?? "Error al convertir la lista a compra";
    } finally {
      this.loading = false;
    }
  }
}
