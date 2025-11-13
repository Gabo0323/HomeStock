import { makeAutoObservable } from "mobx";
import { CreateRatingDto } from "@/data/dto/ratingDto";
import { ProductRating } from "@/domain/entities/ratingEntity";
import { CreateProductRatingUseCase } from "@/domain/useCases/createProductRatingUseCase";

export class ProductRatingViewModel {
  private createProductRatingUseCase: CreateProductRatingUseCase;

  rating: ProductRating | null = null;
  ratings: ProductRating[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(createProductRatingUseCase: CreateProductRatingUseCase) {
    makeAutoObservable(this);
    this.createProductRatingUseCase = createProductRatingUseCase;
  }

  async createRating(dto: CreateRatingDto) {
    this.loading = true;
    this.error = null;
    try {
      const result = await this.createProductRatingUseCase.execute(dto);
      this.rating = result;
      this.ratings.push(result);
    } catch (err: any) {
      this.error = err.message || "Error al crear la calificación";
    } finally {
      this.loading = false;
    }
  }
}
