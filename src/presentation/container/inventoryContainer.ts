import { InventoryRepositoryImpl } from "@/data/repositories/inventoryRepositoryImpl";
import { InventoryRemoteDataSource } from "@/data/datasources/inventoryRemoteDataSource";
import { ProductRemoteDataSource } from "@/data/datasources/productRemoteDataSource";

import { GetInventoryPageUseCase } from "@/domain/useCases/getInventoryPageUseCase";
import { CreateInventoryItemUseCase } from "@/domain/useCases/createInventoryItemUseCase";
import { BulkConsumeUseCase } from "@/domain/useCases/bulkConsumeUseCase";
import { TransferStockUseCase } from "@/domain/useCases/transferStockUseCase";

import { InventoryViewModel } from "@/presentation/viewModels/inventoryViewModel";
const remote = new InventoryRemoteDataSource();
const productRemote = new ProductRemoteDataSource();
const repo = new InventoryRepositoryImpl(remote, productRemote);


export const inventoryViewModel = new InventoryViewModel(
  new GetInventoryPageUseCase(repo),
  new CreateInventoryItemUseCase(repo),
  new BulkConsumeUseCase(repo),
  new TransferStockUseCase(repo)
);
