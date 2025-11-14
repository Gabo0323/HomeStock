import { ShoppingListRemoteDataSource } from "@/data/datasources/shoppingListRemoteDataSource";
import { ShoppingListRepositoryImpl } from "@/data/repositories/shoppingListRepositoryImpl";
import { AddItemToShoppingListUseCase } from "@/domain/useCases/addItemToShoppingListUseCase";
import { ConvertShoppingListToPurchaseUseCase } from "@/domain/useCases/convertShoppingListToPurchaseUseCase";
import { CreateShoppingListUseCase } from "@/domain/useCases/createShoppingListUseCase";
import { GenerateItemsFromLowStockUseCase } from "@/domain/useCases/generateItemsFromLowStockUseCase";
import { GetShoppingListByIdUseCase } from "@/domain/useCases/getShoppingListByIdUseCase";
import { GetShoppingListsByUserIdUseCase } from "@/domain/useCases/getShoppingListsByUserIdUseCase";
import { UpdateShoppingListItemUseCase } from "@/domain/useCases/updateShoppingListItemUseCase";
import { ShoppingListViewModel } from "@/presentation/viewModels/shoppingListViewModel";

const remote = new ShoppingListRemoteDataSource();
const repo = new ShoppingListRepositoryImpl(remote);

export const shoppingListViewModel = new ShoppingListViewModel(
  new CreateShoppingListUseCase(repo),
  new GetShoppingListsByUserIdUseCase(repo),
  new GetShoppingListByIdUseCase(repo),
  new AddItemToShoppingListUseCase(repo),
  new UpdateShoppingListItemUseCase(repo),
  new GenerateItemsFromLowStockUseCase(repo),
  new ConvertShoppingListToPurchaseUseCase(repo)
);