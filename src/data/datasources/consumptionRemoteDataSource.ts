import { axiosClient } from "../../api/axiosClient";
import { RegisterConsumptionDto, ConsumptionDto } from "../dto/consumptionDto";

export class ConsumptionRemoteDataSource {
  async registerConsumption(dto: RegisterConsumptionDto): Promise<ConsumptionDto> {
    try {
      const response = await axiosClient.post("/consumptions", dto);
      return response.data;
    } catch (error: any) {
      console.error("Error al registrar consumo:", error);
      throw error;
    }
  }
}
