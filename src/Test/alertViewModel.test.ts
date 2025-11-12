import { AlertRepositoryImpl } from "@/data/repositories/alertRepositoryImpl";
import { AlertRemoteDataSource } from "@/data/datasources/alertRemoteDataSource";
import { CreateAlertDto, AlertDto } from "@/data/dto/alertDto";
import { CreateAlertUseCase } from "@/domain/useCases/createAlertUseCase";
import { GetActiveAlertsByUserIdUseCase } from "@/domain/useCases/getActiveAlertsByUserIdUseCase";
import { GetAlertByIdUseCase } from "@/domain/useCases/getAlertByIdUseCase";
import { UpdateAlertUseCase } from "@/domain/useCases/updateAlertUseCase";
import { CloseAlertUseCase } from "@/domain/useCases/closeAlertUseCase";
import { AlertViewModel } from "@/presentation/viewModels/alertViewModel";

// ⚙️ Configuración de dependencias reales
const remoteDataSource = new AlertRemoteDataSource();
const repository = new AlertRepositoryImpl(remoteDataSource);

const createAlertUseCase = new CreateAlertUseCase(repository);
const getActiveAlertsByUserIdUseCase = new GetActiveAlertsByUserIdUseCase(repository);
const getAlertByIdUseCase = new GetAlertByIdUseCase(repository);
const updateAlertUseCase = new UpdateAlertUseCase(repository);
const closeAlertUseCase = new CloseAlertUseCase(repository);

const viewModel = new AlertViewModel(
  createAlertUseCase,
  getActiveAlertsByUserIdUseCase,
  getAlertByIdUseCase,
  updateAlertUseCase,
  closeAlertUseCase
);

// 🧍 Variables compartidas
const userId = 13; // Cambia según tu backend
let createdAlertId: number;

describe("🧪 AlertViewModel Integration Tests", () => {
  it("debería crear una alerta correctamente", async () => {
    const dto: CreateAlertDto = {
      userId,
      productId: 35,
      type: "LOW_STOCK",
      message: "Producto con bajo stock",
      triggerAt: new Date().toISOString(),
      active: true,
    };

    await viewModel.createAlert(dto);

    expect(viewModel.alert).toBeTruthy();
    expect(viewModel.alert?.message).toBe("Producto con bajo stock");
    expect(viewModel.alert?.type).toBe("LOW_STOCK");

    createdAlertId = viewModel.alert!.id;

    console.log("✅ Alerta creada:", viewModel.alert);
  });

  it("debería obtener todas las alertas activas del usuario", async () => {
    await viewModel.getActiveAlertsByUserId(userId);

    expect(viewModel.alerts.length).toBeGreaterThan(0);
    expect(viewModel.alerts.every(a => a.active)).toBe(true);

    console.log("📢 Alertas activas del usuario:", viewModel.alerts);
  });

  it("debería obtener una alerta específica por su ID", async () => {
    await viewModel.getAlertById(createdAlertId);

    expect(viewModel.alert).not.toBeNull();
    expect(viewModel.alert?.id).toBe(createdAlertId);

    console.log("🔍 Alerta obtenida:", viewModel.alert);
  });

  it("debería actualizar el mensaje de la alerta", async () => {
    const updateDto: Partial<AlertDto> = {
      message: "Mensaje actualizado desde Jest",
      active: true,
    };

    await viewModel.updateAlert(createdAlertId, updateDto);

    expect(viewModel.alert?.message).toBe("Mensaje actualizado desde Jest");

    console.log("♻️ Alerta actualizada:", viewModel.alert);
  });

  it("debería cerrar la alerta correctamente", async () => {
    await viewModel.closeAlert(createdAlertId);

    expect(viewModel.alert?.active).toBe(false);
    expect(viewModel.alert?.resolvedAt).toBeDefined();

    console.log(`🗝️ Alerta con ID ${createdAlertId} cerrada correctamente`);
  });
});
