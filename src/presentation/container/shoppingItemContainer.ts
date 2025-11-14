import { ShoppingItemRemoteDataSource } from "@/data/datasources/shoppingItemRemoteDataSource";
import { ShoppingItemRepositoryImpl } from "@/data/repositories/shoppingItemRepositoryImpl";
import { CreateShoppingItemUseCase } from "@/domain/useCases/createShoppingItemUseCase";
import { GetPendingShoppingItemsUseCase } from "@/domain/useCases/getPendingShoppingItemsUseCase";
import { UpdateShoppingItemUseCase } from "@/domain/useCases/updateShoppingItemUseCase";
import { ShoppingItemViewModel } from "@/presentation/viewModels/shoppingItemViewModel";

const remote = new ShoppingItemRemoteDataSource();
const repo = new ShoppingItemRepositoryImpl(remote);

export const shoppingItemViewModel = new ShoppingItemViewModel(
  new CreateShoppingItemUseCase(repo),
  new GetPendingShoppingItemsUseCase(repo),
  new UpdateShoppingItemUseCase(repo)
);