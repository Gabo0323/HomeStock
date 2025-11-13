import { ProductRating } from "../entities/ratingEntity";
import { ProductRatingRepository } from "../repositories/productRatingRepository";
import { CreateRatingDto } from "@/data/dto/ratingDto";

export class CreateProductRatingUseCase {
  private productRatingRepository: ProductRatingRepository;

  constructor(productRatingRepository: ProductRatingRepository) {
    this.productRatingRepository = productRatingRepository;
  }

  async execute(dto: CreateRatingDto): Promise<ProductRating> {
    return await this.productRatingRepository.createRating(dto);
  }
}
