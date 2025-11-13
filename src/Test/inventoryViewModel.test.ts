import { ProductRepositoryImpl } from "@/data/repositories/productRepositoryImpl";
import { ProductRemoteDataSource } from "@/data/datasources/productRemoteDataSource";
import { CreateProductUseCase } from "@/domain/useCases/productUseCase";

import { InventoryRepositoryImpl } from "@/data/repositories/inventoryRepositoryImpl";
import { InventoryRemoteDataSource } from "@/data/datasources/inventoryRemoteDataSource";

import { GetInventoryPageUseCase } from "@/domain/useCases/getInventoryPageUseCase";
import { CreateInventoryItemUseCase } from "@/domain/useCases/createInventoryItemUseCase";
import { BulkConsumeUseCase } from "@/domain/useCases/bulkConsumeUseCase";
import { TransferStockUseCase } from "@/domain/useCases/transferStockUseCase";

import { InventoryViewModel } from "@/presentation/viewModels/inventoryViewModel";

const productRemote = new ProductRemoteDataSource();
const productRepo = new ProductRepositoryImpl(productRemote);
const createProductUseCase = new CreateProductUseCase(productRepo);

const inventoryRemote = new InventoryRemoteDataSource();
const inventoryRepo = new InventoryRepositoryImpl(inventoryRemote, productRemote);

const vm = new InventoryViewModel(
  new GetInventoryPageUseCase(inventoryRepo),
  new CreateInventoryItemUseCase(inventoryRepo),
  new BulkConsumeUseCase(inventoryRepo),
  new TransferStockUseCase(inventoryRepo)
);

let createdProductId = 0;
const timestamp = Date.now();

describe("InventoryViewModel Integration Tests", () => {

  it("Debe crear un producto antes del inventario", async () => {
    const product = await createProductUseCase.execute({
      userId: 13,
      name: `Producto sfd ${timestamp}`,
      categoryId: 1,
      quantity: 1,
      minStock: 1,
      price: 1000,
      brand: "Marca Test",
      barcode: `SFD-${timestamp}`
    });

    createdProductId = product.id;
    expect(createdProductId).toBeGreaterThan(0);
  });

  it("Debe cargar inventario", async () => {
    await vm.loadInventory(0, 10);
    expect(vm.inventory.length).toBeGreaterThan(0);
  });

  it("Debe agregar item al inventario usando el producto recién creado", async () => {
    // Usar el producto que acabamos de crear, no uno existente del inventario
    const created = await vm.createItem(createdProductId, 5);
    expect(created).toBeTruthy();
    expect(created.quantity).toBe(5);
  });

  it("Debe hacer consumo masivo", async () => {
    // Usar el producto creado en lugar de uno del inventario
    await vm.bulkConsume(13, [{ productId: createdProductId, quantity: 1 }]);
  });

  it("Debe transferir stock", async () => {
    // Usar el producto creado en lugar de uno del inventario
    await vm.transferStock(13, createdProductId, 1, 2, 1);
  });
});