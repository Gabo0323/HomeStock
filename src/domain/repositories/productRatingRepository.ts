import { CreateRatingDto, RatingDto } from "../../data/dto/ratingDto";
import { ProductRating } from "../entities/ratingEntity";

export interface ProductRatingRepository {
  createRating(dto: CreateRatingDto): Promise<ProductRating>;
}
