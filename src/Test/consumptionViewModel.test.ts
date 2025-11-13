import { ConsumptionRemoteDataSource } from "@/data/datasources/consumptionRemoteDataSource";
import { ConsumptionRepositoryImpl } from "@/data/repositories/consumptionRepositoryImpl";
import { RegisterConsumptionUseCase } from "@/domain/useCases/registerConsumptionUseCase";
import { ConsumptionViewModel } from "@/presentation/viewModels/consumptionViewModel";
import { RegisterConsumptionDto } from "@/data/dto/consumptionDto";

// 🔧 Configuración real
const remoteDataSource = new ConsumptionRemoteDataSource();
const repository = new ConsumptionRepositoryImpl(remoteDataSource);
const registerConsumptionUseCase = new RegisterConsumptionUseCase(repository);
const viewModel = new ConsumptionViewModel(registerConsumptionUseCase);

describe("🧪 ConsumptionViewModel Integration Test", () => {
  it("debería registrar un consumo correctamente en la base de datos", async () => {
    const dto: RegisterConsumptionDto = {
      userId: 13,
      productId: 37,
      quantity: 1,
      note: "Consumo diario",
    };

    await viewModel.registerConsumption(dto);

    expect(viewModel.consumption).toBeTruthy();
    expect(viewModel.consumption?.type).toBe("CONSUMPTION");
    console.log("✅ Consumo registrado:", viewModel.consumption);
  });
});
