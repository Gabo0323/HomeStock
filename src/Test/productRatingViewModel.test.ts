import { ProductRatingRemoteDataSource } from "@/data/datasources/productRatingRemoteDataSource";
import { ProductRatingRepositoryImpl } from "@/data/repositories/productRatingRepositoryImpl";
import { CreateProductRatingUseCase } from "@/domain/useCases/createProductRatingUseCase";
import { ProductRatingViewModel } from "@/presentation/viewModels/productRatingViewModel";
import { CreateRatingDto } from "@/data/dto/ratingDto";

// 🔧 Configuración de dependencias
const remoteDataSource = new ProductRatingRemoteDataSource();
const repository = new ProductRatingRepositoryImpl(remoteDataSource);
const createProductRatingUseCase = new CreateProductRatingUseCase(repository);

const viewModel = new ProductRatingViewModel(createProductRatingUseCase);

// 🧍 Variables compartidas
const userId = 13; // ⚠️ Asegúrate de que exista este usuario en tu backend
const productId = 37; // ⚠️ Producto existente asociado
let createdRatingId: number;

describe("🧪 ProductRatingViewModel Integration Tests", () => {
  it("debería crear una calificación correctamente", async () => {
    const dto: CreateRatingDto = {
      userId,
      productId,
      qualityScore: 5,
      notes: "Excelente calidad del producto",
    };

    await viewModel.createRating(dto);

    expect(viewModel.rating).toBeTruthy();
    expect(viewModel.rating?.qualityScore).toBe(5);
    createdRatingId = viewModel.rating!.id;

    console.log("✅ Calificación creada:", viewModel.rating);
  });

  it("debería agregar la calificación a la lista local", async () => {
    expect(viewModel.ratings.length).toBeGreaterThan(0);
    expect(viewModel.ratings.some(r => r.id === createdRatingId)).toBe(true);
    console.log("📦 Lista de calificaciones:", viewModel.ratings);
  });

  it("debería tener valores correctos en el ViewModel", async () => {
    expect(viewModel.loading).toBe(false);
    expect(viewModel.error).toBeNull();
    expect(viewModel.rating?.userId).toBe(userId);
    expect(viewModel.rating?.productId).toBe(productId);
    console.log("🔍 Estado final del ViewModel:", {
      rating: viewModel.rating,
      loading: viewModel.loading,
      error: viewModel.error,
    });
  });
});
