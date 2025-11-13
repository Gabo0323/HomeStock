import { axiosClient } from "../../api/axiosClient";
import { CreateRatingDto } from "../dto/ratingDto";

export class ProductRatingRemoteDataSource {

  async createRating(dto: CreateRatingDto) {
    try {
      const response = await axiosClient.put("/ratings", dto);
      return response.data;
    } catch (error: any) {
      console.error("Error al crear calificación:", error);
      throw error;
    }
  }

}
