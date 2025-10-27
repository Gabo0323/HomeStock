// src/presentation/viewModels/productViewModel.integration.test.ts
import { ProductViewModel } from "./productViewModel";
import { ProductRepositoryImpl } from "@/data/repositories/productRepositoryImpl";
import { ProductRemoteDataSource } from "@/data/datasources/productRemoteDataSource";
import { CreateProductUseCase } from "@/domain/useCases/productUseCase";
import { CreateProductDto } from "@/data/dto/productDto";
import { toJS } from "mobx";

describe("ProductViewModel - integración real", () => {
  let viewModel: ProductViewModel;

  beforeEach(() => {
    const remoteDataSource = new ProductRemoteDataSource();
    const repository = new ProductRepositoryImpl(remoteDataSource);
    const useCase = new CreateProductUseCase(repository);
    viewModel = new ProductViewModel(useCase);
  });

  it("debe crear un producto real en el backend", async () => {
    const dto: CreateProductDto = {
      userId: 1,
      name: `ProductoPrueba_${Date.now()}`, // nombre único para evitar conflicto 409
      categoryId: 2,
      quantity: 5,
      minStock: 2,
      price: 2500,
      brand: "MarcaTest",
      barcode: "1234567890123",
    };

    await viewModel.createProduct(dto);

    expect(viewModel.product).not.toBeNull();
    expect(viewModel.product?.name).toBe(dto.name);
    expect(viewModel.error).toBeNull();
    expect(viewModel.loading).toBe(false);

    console.log("Producto creado en backend:", toJS(viewModel.product));
  },
20000 // 20 segundos
);
});
