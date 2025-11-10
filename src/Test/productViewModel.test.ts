import { ProductRepositoryImpl } from "@/data/repositories/productRepositoryImpl";
import { ProductRemoteDataSource } from "@/data/datasources/productRemoteDataSource";
import { CreateProductDto, ProductDto } from "@/data/dto/productDto";
import { CreateProductUseCase } from "@/domain/useCases/productUseCase";
import { GetProductsByUserIdUseCase } from "@/domain/useCases/getProductsByUseCase";
import { GetProductByIdUseCase } from "@/domain/useCases/getProductByIdUseCase";
import { UpdateProductUseCase } from "@/domain/useCases/updateProductUseCase";
import { DeleteProductUseCase } from "@/domain/useCases/deleteProductUseCase";
import { ProductViewModel } from "@/presentation/viewModels/productViewModel";

// 🔧 Configuración de dependencias
const remoteDataSource = new ProductRemoteDataSource();
const repository = new ProductRepositoryImpl(remoteDataSource);

const createProductUseCase = new CreateProductUseCase(repository);
const getProductsByUserIdUseCase = new GetProductsByUserIdUseCase(repository);
const getProductByIdUseCase = new GetProductByIdUseCase(repository);
const updateProductUseCase = new UpdateProductUseCase(repository);
const deleteProductUseCase = new DeleteProductUseCase(repository);

const viewModel = new ProductViewModel(
  createProductUseCase,
  getProductsByUserIdUseCase,
  getProductByIdUseCase,
  updateProductUseCase,
  deleteProductUseCase
);

// 🧍 Variables compartidas
const userId = 13; // <- reemplázalo por un usuario existente en tu backend
let createdProductId: number;

describe("🧪 ProductViewModel Integration Tests", () => {
  it("debería crear un producto correctamente", async () => {
    const dto: CreateProductDto = {
      userId,
      name: "Producto Test Jest",
      categoryId: 1,
      quantity: 10,
      minStock: 2,
      price: 1500,
      brand: "Marca Prueba",
      barcode: "9876543210123",
    };

    await viewModel.createProduct(dto);

    expect(viewModel.product).toBeTruthy();
    expect(viewModel.product?.name).toBe("Producto Test Jest");
    createdProductId = viewModel.product!.id;

    console.log("✅ Producto creado:", viewModel.product);
  });

  it("debería obtener todos los productos del usuario", async () => {
    await viewModel.getProductsByUserId(userId);

    expect(viewModel.products.length).toBeGreaterThan(0);
    console.log("📦 Productos del usuario:", viewModel.products);
  });

  it("debería obtener el producto recién creado por su ID", async () => {
    await viewModel.getProductById(createdProductId);

    expect(viewModel.product).not.toBeNull();
    expect(viewModel.product?.id).toBe(createdProductId);
    console.log("🔍 Producto obtenido:", viewModel.product);
  });

  it("debería actualizar el minStock del producto", async () => {
    const updateDto: ProductDto = {
  id: 1,
  userId: 101,
  name: "Producto actualizado",
  categoryId: 4,
  quantity: 15,
  minStock: 10,
  acquisitionDate: "2025-11-08",
  price: 20.99,
  purchaseLocationId: 2,
  brand: "Nueva Marca",
  imageUrl: "https://example.com/updated-image.jpg",
  createdAt: new Date("2025-11-01T00:00:00Z"),
  updatedAt: new Date("2025-11-08T00:00:00Z"),
};

    await viewModel.updateProduct(updateDto.id, updateDto);

    expect(viewModel.product?.minStock).toBe(10);
    console.log("♻️ Producto actualizado:", viewModel.product);
  });

  it("debería eliminar el producto correctamente", async () => {
    await viewModel.deleteProduct(createdProductId);

    expect(
      viewModel.products.find((p) => p.id === createdProductId)
    ).toBeUndefined();

    console.log(`🗑️ Producto con ID ${createdProductId} eliminado correctamente`);
  });
});
