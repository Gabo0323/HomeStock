import { ProductRemoteDataSource } from "@/data/datasources/productRemoteDataSource";
import { ProductRepositoryImpl } from "@/data/repositories/productRepositoryImpl";
import { CreateProductUseCase } from "@/domain/useCases/productUseCase";
import { GetProductsByUserIdUseCase } from "@/domain/useCases/getProductsByUseCase";
import { GetProductByIdUseCase } from "@/domain/useCases/getProductByIdUseCase";
import { UpdateProductUseCase } from "@/domain/useCases/updateProductUseCase";
import { DeleteProductUseCase } from "@/domain/useCases/deleteProductUseCase";
import { ProductViewModel } from "@/presentation/viewModels/productViewModel";

const remote = new ProductRemoteDataSource();
const repo = new ProductRepositoryImpl(remote);

export const productViewModel = new ProductViewModel(
  new CreateProductUseCase(repo),
  new GetProductsByUserIdUseCase(repo),
  new GetProductByIdUseCase(repo),
  new UpdateProductUseCase(repo),
  new DeleteProductUseCase(repo)
);