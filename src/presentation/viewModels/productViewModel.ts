import { CreateProductDto, ProductDto } from "@/data/dto/productDto";
import { Product } from "@/domain/entities/productEntity";
import { DeleteProductUseCase } from "@/domain/useCases/deleteProductUseCase";
import { GetProductByIdUseCase } from "@/domain/useCases/getProductByIdUseCase";
import { GetProductsByUserIdUseCase } from "@/domain/useCases/getProductsByUseCase";
import { CreateProductUseCase } from "@/domain/useCases/productUseCase";
import { UpdateProductUseCase } from "@/domain/useCases/updateProductUseCase";
import { makeAutoObservable, action } from "mobx";


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

  @action
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

  @action
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

  @action
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

  @action
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

  @action
  async deleteProduct(productId: number) {
    this.loading = true;
    this.error = null;
    try {
      await this.deleteProductUseCase.execute(productId);
      // Solo remover del array local si la eliminación fue exitosa
      this.products = this.products.filter((p) => p.id !== productId);
      console.log('✅ Producto eliminado exitosamente del backend y array local');
    } catch (err: any) {
      console.log('❌ Error en ProductViewModel.deleteProduct:', err);
      
      // Manejo específico de diferentes códigos de error
      if (err?.response?.status === 409) {
        this.error = "No se puede eliminar el producto porque tiene dependencias asociadas";
        console.log('⚠️ Error 409: Producto tiene dependencias');
      } else if (err?.response?.status === 404) {
        this.error = "El producto no fue encontrado";
        console.log('⚠️ Error 404: Producto no encontrado');
        // Remover del array local si no existe en el backend
        this.products = this.products.filter((p) => p.id !== productId);
      } else {
        this.error = err.message || "Error al eliminar producto";
      }
      
      // Re-lanzar el error para que lo maneje el componente
      throw err;
    } finally {
      this.loading = false;
    }
  }
}
