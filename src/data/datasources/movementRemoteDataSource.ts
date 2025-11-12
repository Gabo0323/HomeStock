import { axiosClient } from "../../api/axiosClient";
import { CreateMovementDto, MovementDto } from "../dto/movementDto";

export class MovementRemoteDataSource {
  /**
   * Crea un nuevo movimiento en el sistema.
   * Endpoint: POST /api/v1/movements
   */
  async createMovement(dto: CreateMovementDto): Promise<MovementDto> {
    try {
      const response = await axiosClient.post("/movements", dto);
      return response.data;
    } catch (error: any) {
      console.error("Error al crear movimiento:", error);
      throw error;
    }
  }
}
