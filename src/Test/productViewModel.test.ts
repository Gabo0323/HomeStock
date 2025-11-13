import { ProductRepositoryImpl } from "@/data/repositories/productRepositoryImpl";
import { ProductRemoteDataSource } from "@/data/datasources/productRemoteDataSource";
import { CreateProductDto, ProductDto } from "@/data/dto/productDto";
import { CreateProductUseCase } from "@/domain/useCases/productUseCase";
import { GetProductsByUserIdUseCase } from "@/domain/useCases/getProductsByUseCase";
import { GetProductByIdUseCase } from "@/domain/useCases/getProductByIdUseCase";
import { UpdateProductUseCase } from "@/domain/useCases/updateProductUseCase";
import { DeleteProductUseCase } from "@/domain/useCases/deleteProductUseCase";
import { ProductViewModel } from "@/presentation/viewModels/productViewModel";

// 🔧 Configuración de dependencias reales
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

// 🧍 Variables de prueba
const userId = 13; // Asegúrate de que este usuario existe en tu backend
let createdProductId: number | null = null;

describe("🧪 ProductViewModel Integration Test", () => {
  // Espera un poco entre requests para evitar saturar el backend
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  it("✅ debería crear un producto correctamente", async () => {
    const dto: CreateProductDto = {
      userId,
      name: "Producto Jest Test",
      categoryId: 1,
      quantity: 10,
      minStock: 2,
      price: 1500,
      brand: "Marca Prueba Jest",
      barcode: `${Date.now()}`, // evita duplicados
    };

    await viewModel.createProduct(dto);

    expect(viewModel.error).toBeNull();
    expect(viewModel.product).not.toBeNull();
    expect(viewModel.product?.name).toBe("Producto Jest Test");

    createdProductId = viewModel.product?.id ?? null;
    console.log("✅ Producto creado:", viewModel.product);
    expect(createdProductId).not.toBeNull();

    await delay(1000);
  });

  it("📦 debería obtener todos los productos del usuario", async () => {
    await viewModel.getProductsByUserId(userId);

    expect(viewModel.error).toBeNull();
    expect(Array.isArray(viewModel.products)).toBe(true);
    expect(viewModel.products.length).toBeGreaterThan(0);

    console.log("📦 Productos obtenidos:", viewModel.products.length);
    await delay(1000);
  });

  it("🔍 debería obtener el producto recién creado por su ID", async () => {
    expect(createdProductId).not.toBeNull();

    await viewModel.getProductById(createdProductId!);

    expect(viewModel.error).toBeNull();
    expect(viewModel.product).not.toBeNull();
    expect(viewModel.product?.id).toBe(createdProductId);

    console.log("🔍 Producto obtenido por ID:", viewModel.product);
    await delay(1000);
  });

  it("♻️ debería actualizar correctamente el producto", async () => {
    expect(createdProductId).not.toBeNull();

    const updateDto: ProductDto = {
      id: createdProductId!,
      userId,
      name: "Producto Actualizado Jest",
      categoryId: 2,
      quantity: 15,
      minStock: 5,
      acquisitionDate: "2025-11-08",
      price: 2500,
      purchaseLocationId: 1,
      brand: "Marca Actualizada",
      imageUrl: "https://example.com/image-updated.jpg",
      createdAt: new Date("2025-11-01T00:00:00Z"),
      updatedAt: new Date("2025-11-08T00:00:00Z"),
    };

    await viewModel.updateProduct(createdProductId!, updateDto);

    expect(viewModel.error).toBeNull();
    expect(viewModel.product?.minStock).toBe(5);
    expect(viewModel.product?.name).toBe("Producto Actualizado Jest");

    console.log("♻️ Producto actualizado:", viewModel.product);
    await delay(1000);
  });

  it("🗑️ debería eliminar el producto correctamente", async () => {
    expect(createdProductId).not.toBeNull();

    await viewModel.deleteProduct(createdProductId!);

    expect(viewModel.error).toBeNull();
    console.log(`🗑️ Producto con ID ${createdProductId} eliminado correctamente`);

    // Verificar que ya no existe en la lista del usuario
    await viewModel.getProductsByUserId(userId);
    const deleted = viewModel.products.find((p) => p.id === createdProductId);
    expect(deleted).toBeUndefined();
  });
});
