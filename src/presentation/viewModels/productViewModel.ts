import { CreateProductDto } from "@/data/dto/productDto";
import { Product } from "@/domain/entities/productEntity";
import { CreateProductUseCase } from "@/domain/useCases/productUseCase";
import { makeAutoObservable } from "mobx"; // o puedes usar Zustand, Recoil, etc.


export class ProductViewModel {
  createProductUseCase: CreateProductUseCase;


  product: Product | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(createProductUseCase: CreateProductUseCase) {
    makeAutoObservable(this);
    this.createProductUseCase = createProductUseCase;
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
}
