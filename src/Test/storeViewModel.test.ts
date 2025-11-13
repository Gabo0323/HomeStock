import { StoreRemoteDataSource } from "@/data/datasources/storeRemoteDataSource";
import { StoreRepositoryImpl } from "@/data/repositories/storeRepositoryImpl";

import { CreateStoreUseCase } from "@/domain/useCases/createStoreUseCase";
import { GetStoresUseCase } from "@/domain/useCases/getStoresUseCase";
import { UpdateStoreUseCase } from "@/domain/useCases/updateStoreUseCase";
import { DeleteStoreUseCase } from "@/domain/useCases/deleteStoreUseCase";

import { StoreViewModel } from "@/presentation/viewModels/storeViewModel";

import { CreateStoreDto, UpdateStoreDto } from "@/data/dto/storeDto";

// ------------------------------------------------------
// 🔧 CONFIGURACIÓN DE DEPENDENCIAS (igual a tu patrón)
// ------------------------------------------------------
const remoteDataSource = new StoreRemoteDataSource();
const repository = new StoreRepositoryImpl(remoteDataSource);

const getStoresUseCase = new GetStoresUseCase(repository);
const createStoreUseCase = new CreateStoreUseCase(repository);
const updateStoreUseCase = new UpdateStoreUseCase(repository);
const deleteStoreUseCase = new DeleteStoreUseCase(repository);

const viewModel = new StoreViewModel(
  getStoresUseCase,
  createStoreUseCase,
  updateStoreUseCase,
  deleteStoreUseCase
);

// VARIABLES COMPARTIDAS PARA LOS TESTS

let createdStoreId: number;

// STORE VIEWMODEL INTEGRATION TESTS

describe(" StoreViewModel Integration Tests", () => {

  // CREATE

  it("debería crear una store correctamente", async () => {
    const dto: CreateStoreDto = {
      name: "SuperMercado Jest 2",
      location: "Avenida Test 1234",
      notes: "Notas de prueba"
    };

    await viewModel.createStore(dto);

    expect(viewModel.store).toBeTruthy();
    expect(viewModel.store?.name).toBe("SuperMercado Jest 2");

    createdStoreId = viewModel.store!.id;

    console.log("Store creada:", viewModel.store);
  });

  // GET ALL

  it("debería obtener todas las stores", async () => {
    await viewModel.getStores();

    expect(viewModel.stores.length).toBeGreaterThan(0);

    console.log("Stores obtenidas:", viewModel.stores);
  });

  // UPDATE

  it("debería actualizar la store creada", async () => {
    const updateDto: UpdateStoreDto = {
      notes: "Notas actualizadas desde Jest"
    };

    await viewModel.updateStore(createdStoreId, updateDto);

    expect(viewModel.store?.notes).toBe("Notas actualizadas desde Jest");

    console.log("Store actualizada:", viewModel.store);
  });

  // DELETE

  it("debería eliminar la store correctamente", async () => {
    await viewModel.deleteStore(createdStoreId);

    expect(
      viewModel.stores.find((s) => s.id === createdStoreId)
    ).toBeUndefined();

    console.log(`Store con ID ${createdStoreId} eliminada correctamente`);
  });
});
