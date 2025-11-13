import { ProductRating } from "@/domain/entities/ratingEntity";
import { ProductRatingRepository } from "@/domain/repositories/productRatingRepository";
import { ProductRatingRemoteDataSource } from "../datasources/productRatingRemoteDataSource";
import { CreateRatingDto, RatingDto } from "../dto/ratingDto";
import { ProductRatingMapper } from "../mapper/productRatingMapper";

export class ProductRatingRepositoryImpl implements ProductRatingRepository {
  private remoteDataSource: ProductRatingRemoteDataSource;

  constructor(remoteDataSource: ProductRatingRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async createRating(dto: CreateRatingDto): Promise<ProductRating> {
    try {
      // 🧭 Convertimos el DTO antes de enviarlo
      const createDto = ProductRatingMapper.toCreateDto(dto);

      // 🚀 Llamamos al datasource remoto
      const result: RatingDto = await this.remoteDataSource.createRating(createDto);

      // 🔄 Mapeamos la respuesta a entidad de dominio
      return ProductRatingMapper.fromDto(result);
    } catch (error) {
      console.error("Error en ProductRatingRepositoryImpl.createRating:", error);
      throw error;
    }
  }
}
