import { CreateProductDto, ProductDto } from "@/data/dto/productDto";
import { Product } from "@/domain/entities/productEntity";
import { DeleteProductUseCase } from "@/domain/useCases/deleteProductUseCase";
import { GetProductByIdUseCase } from "@/domain/useCases/getProductByIdUseCase";
import { GetProductsByUserIdUseCase } from "@/domain/useCases/getProductsByUseCase";
import { CreateProductUseCase } from "@/domain/useCases/productUseCase";
import { UpdateProductUseCase } from "@/domain/useCases/updateProductUseCase";
import { makeAutoObservable } from "mobx";


export class ProductViewModel {
  private createProductUseCase: CreateProductUseCase;
  private getProductsByUserIdUseCase: GetProductsByUserIdUseCase
  private getProductByIdUseCase: GetProductByIdUseCase;
  private updateProductUseCase: UpdateProductUseCase;
  private deleteProductUseCase: DeleteProductUseCase;

  product: Product | null = null;
  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    createProductUseCase: CreateProductUseCase,
    getProductsByUserIdUseCase: GetProductsByUserIdUseCase,
    getProductByIdUseCase: GetProductByIdUseCase,
    updateProductUseCase: UpdateProductUseCase,
    deleteProductUseCase: DeleteProductUseCase
  ) {
    makeAutoObservable(this);
    this.createProductUseCase = createProductUseCase;
    this.getProductsByUserIdUseCase = getProductsByUserIdUseCase;
    this.getProductByIdUseCase = getProductByIdUseCase;
    this.updateProductUseCase = updateProductUseCase;
    this.deleteProductUseCase = deleteProductUseCase;
  }

  async createProduct(dto: CreateProductDto) {
    this.loading = true;
    this.error = null;
    try {
      const result = await this.createProductUseCase.execute(dto);
      this.product = result;
    } catch (err: any) {
      this.error = err.message || "Error al crear producto";
    } finally {
      this.loading = false;
    }
  }

    async getProductsByUserId(userId: number) {
    this.loading = true;
    this.error = null;
    try {
      this.products = await this.getProductsByUserIdUseCase.execute(userId);
    } catch (err: any) {
      this.error = err.message || "Error al obtener productos";
    } finally {
      this.loading = false;
    }
  }

    async getProductById(productId: number) {
    this.loading = true;
    this.error = null;
    try {
      this.product = await this.getProductByIdUseCase.execute(productId);
    } catch (err: any) {
      this.error = err.message || "Error al obtener producto";
    } finally {
      this.loading = false;
    }
  }

    async updateProduct(productId: number, dto: ProductDto) {
    this.loading = true;
    this.error = null;
    try {
      this.product = await this.updateProductUseCase.execute(productId, dto);
    } catch (err: any) {
      this.error = err.message || "Error al actualizar producto";
    } finally {
      this.loading = false;
    }
  }

    async deleteProduct(productId: number) {
    this.loading = true;
    this.error = null;
    try {
      await this.deleteProductUseCase.execute(productId);
      this.products = this.products.filter((p) => p.id !== productId);
    } catch (err: any) {
      this.error = err.message || "Error al eliminar producto";
    } finally {
      this.loading = false;
    }
  }
}
