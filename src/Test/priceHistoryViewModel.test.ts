import { PriceHistoryRepositoryImpl } from "@/data/repositories/priceHistoryRepositoryImpl";
import { PriceHistoryRemoteDataSource } from "@/data/datasources/priceHistoryRemoteDaaSource";
import { CreatePriceHistoryDto } from "@/data/dto/priceHistoryDto";
import { CreatePriceHistoryUseCase } from "@/domain/useCases/createPriceHistoryUseCase";
import { GetLastPriceByProductIdUseCase } from "@/domain/useCases/getLastPriceByProductIdUseCase";
import { PriceHistoryViewModel } from "@/presentation/viewModels/priceHistoryViewModel";

// 🔧 Configuración de dependencias
const remoteDataSource = new PriceHistoryRemoteDataSource();
const repository = new PriceHistoryRepositoryImpl(remoteDataSource);

const createPriceHistoryUseCase = new CreatePriceHistoryUseCase(repository);
const getLastPriceByProductIdUseCase = new GetLastPriceByProductIdUseCase(repository);

const viewModel = new PriceHistoryViewModel(
  createPriceHistoryUseCase,
  getLastPriceByProductIdUseCase
);

// 🧍 Variables compartidas
const productId = 1; // Cambia por un ID existente en tu base de datos o backend
const storeId = 1;

describe("🧪 PriceHistoryViewModel Integration Tests", () => {
  let createdPriceHistoryId: number | undefined;

  it("debería crear un historial de precio correctamente", async () => {
    const dto: CreatePriceHistoryDto = {
      productId,
      storeId,
      unitPrice: 2500.75,
      recordedAt: new Date().toISOString(),
    };

    await viewModel.createPriceHistory(dto);

    expect(viewModel.priceHistory).toBeTruthy();
    expect(viewModel.priceHistory?.productId).toBe(productId);
    expect(viewModel.priceHistory?.unitPrice).toBe(2500.75);

    createdPriceHistoryId = viewModel.priceHistory?.id;

    console.log("✅ Historial de precio creado:", viewModel.priceHistory);
  });

  it("debería obtener el último historial de precio por ID de producto", async () => {
    await viewModel.getLastPriceByProductId(productId);

    expect(viewModel.priceHistory).not.toBeNull();
    expect(viewModel.priceHistory?.productId).toBe(productId);

    console.log("📈 Último historial de precio obtenido:", viewModel.priceHistory);
  });
/*
  it("debería manejar errores correctamente si el producto no existe", async () => {
    const invalidProductId = 999999;

    await viewModel.getLastPriceByProductId(invalidProductId);

    expect(viewModel.error).toBeTruthy();
    console.log("⚠️ Error esperado al buscar producto inexistente:", viewModel.error);
  });*/
});
