import { ProductRemoteDataSource } from "@/data/datasources/productRemoteDataSource";

describe("ProductRemoteDataSource", () => {
  it("debería crear un producto correctamente", async () => {
    const dataSource = new ProductRemoteDataSource();

    const newProduct = {
      userId: 1,
      name: "Arroz Integral test",
      categoryId: 3,
      quantity: 5,
      minStock: 2,
      price: 2500,
      brand: "Marca Saludable",
      barcode: "1234567890123",
    };

    const result = await dataSource.createProduct(newProduct);
    console.log("Resultado:", result);

    expect(result).toBeDefined();
  });
});