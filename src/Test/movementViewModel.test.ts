import { MovementRepositoryImpl } from "@/data/repositories/movementRepositoryImpl";
import { MovementRemoteDataSource } from "@/data/datasources/movementRemoteDataSource";
import { CreateMovementDto } from "@/data/dto/movementDto";
import { CreateMovementUseCase } from "@/domain/useCases/createMovementUseCase";
import { MovementViewModel } from "@/presentation/viewModels/movementViewModel";

// 🔧 Configuración de dependencias
const remoteDataSource = new MovementRemoteDataSource();
const repository = new MovementRepositoryImpl(remoteDataSource);
const createMovementUseCase = new CreateMovementUseCase(repository);
const viewModel = new MovementViewModel(createMovementUseCase);

// 🧍 Variables compartidas
const userId = 13; // <-- usa un ID de usuario existente en tu backend
const productId = 37; // <-- usa un ID de producto existente
let createdMovementId: number;

describe("🧪 MovementViewModel Integration Test", () => {
  it("debería crear un movimiento correctamente", async () => {
    const dto: CreateMovementDto = {
      userId,
      productId,
      type: "PURCHASE",
      quantity: 2,
      unitPrice: 2500,
      storeId: 1,
      note: "Compra semanal",
      occurredAt: new Date().toISOString(),
    };

    await viewModel.createMovement(dto);

    expect(viewModel.movement).toBeTruthy();
    expect(viewModel.movement?.userId).toBe(userId);
    expect(viewModel.movement?.productId).toBe(productId);
    expect(viewModel.movement?.type).toBe("PURCHASE");
    expect(viewModel.movement?.quantity).toBe(2);

    createdMovementId = viewModel.movement!.id;

    console.log("✅ Movimiento creado:", viewModel.movement);
  });

  it("debería guardar el movimiento en la lista local", async () => {
    expect(viewModel.movements.length).toBeGreaterThan(0);
    const created = viewModel.movements.find((m) => m.id === createdMovementId);
    expect(created).toBeTruthy();
    console.log("📦 Movimiento almacenado en memoria:", created);
  });

  it("no debería haber errores ni estar cargando", () => {
    expect(viewModel.error).toBeNull();
    expect(viewModel.loading).toBe(false);
  });
});
