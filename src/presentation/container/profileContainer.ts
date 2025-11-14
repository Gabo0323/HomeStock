import { authViewModel } from "./authContainer";

// PRODUCTOS
import { ProductRemoteDataSource } from "@/data/datasources/productRemoteDataSource";
import { ProductRepositoryImpl } from "@/data/repositories/productRepositoryImpl";

import { CreateProductUseCase } from "@/domain/useCases/productUseCase";
import { GetProductsByUserIdUseCase } from "@/domain/useCases/getProductsByUseCase";
import { GetProductByIdUseCase } from "@/domain/useCases/getProductByIdUseCase";
import { UpdateProductUseCase } from "@/domain/useCases/updateProductUseCase";
import { DeleteProductUseCase } from "@/domain/useCases/deleteProductUseCase";

import { ProductViewModel } from "@/presentation/viewModels/productViewModel";

// PRICE HISTORY
import { PriceHistoryRemoteDataSource } from "@/data/datasources/priceHistoryRemoteDaaSource";
import { PriceHistoryRepositoryImpl } from "@/data/repositories/priceHistoryRepositoryImpl";

import { CreatePriceHistoryUseCase } from "@/domain/useCases/createPriceHistoryUseCase";
import { GetLastPriceByProductIdUseCase } from "@/domain/useCases/getLastPriceByProductIdUseCase";

import { PriceHistoryViewModel } from "@/presentation/viewModels/priceHistoryViewModel";


// ---------------------------
// PRODUCTOS
// ---------------------------
const productRemote = new ProductRemoteDataSource();
const productRepo = new ProductRepositoryImpl(productRemote);

const createProductUC = new CreateProductUseCase(productRepo);
const getProductsUC = new GetProductsByUserIdUseCase(productRepo);
const getProductUC = new GetProductByIdUseCase(productRepo);
const updateProductUC = new UpdateProductUseCase(productRepo);
const deleteProductUC = new DeleteProductUseCase(productRepo);

const productViewModel = new ProductViewModel(
  createProductUC,
  getProductsUC,
  getProductUC,
  updateProductUC,
  deleteProductUC
);


// ---------------------------
// HISTORIAL DE PRECIOS
// ---------------------------
const priceHistoryRemote = new PriceHistoryRemoteDataSource();
const priceHistoryRepo = new PriceHistoryRepositoryImpl(priceHistoryRemote);

const createPHUC = new CreatePriceHistoryUseCase(priceHistoryRepo);
const getLastPriceUC = new GetLastPriceByProductIdUseCase(priceHistoryRepo);

const priceHistoryViewModel = new PriceHistoryViewModel(
  createPHUC,
  getLastPriceUC
);



// EXPORTAR TODOS
export {
  authViewModel,
  productViewModel,
  priceHistoryViewModel,
};
