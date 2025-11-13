import { Alert } from "@/domain/entities/alertEntity";
import { AlertRepository } from "@/domain/repositories/alertRepository";
import { AlertRemoteDataSource } from "../datasources/alertRemoteDataSource";
import { AlertDto, CreateAlertDto } from "../dto/alertDto";
import { mapDtoToAlert } from "../mapper/alertMapper";

export class AlertRepositoryImpl implements AlertRepository {
  private remoteDataSource: AlertRemoteDataSource;

  constructor(remoteDataSource: AlertRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async createAlert(dto: CreateAlertDto): Promise<Alert> {
    try {
      const result = await this.remoteDataSource.createAlert(dto);
      return mapDtoToAlert(result);
    } catch (error) {
      console.error("Error en AlertRepositoryImpl.createAlert:", error);
      throw error;
    }
  }

  async getActiveAlertsByUserId(userId: number): Promise<Alert[]> {
    try {
      const result = await this.remoteDataSource.getActiveAlertsByUserId(userId);
      return result.map((dto: AlertDto) => mapDtoToAlert(dto));
    } catch (error) {
      console.error("Error en AlertRepositoryImpl.getActiveAlertsByUserId:", error);
      throw error;
    }
  }
/*
  async getAlertById(alertId: number): Promise<Alert> {
    try {
      const result = await this.remoteDataSource.getAlertById(alertId);
      return mapDtoToAlert(result);
    } catch (error) {
      console.error("Error en AlertRepositoryImpl.getAlertById:", error);
      throw error;
    }
  }
*/
  async updateAlert(alertId: number, dto: Partial<AlertDto>): Promise<Alert> {
    try {
      const result = await this.remoteDataSource.updateAlert(alertId, dto);
      return mapDtoToAlert(result);
    } catch (error) {
      console.error("Error en AlertRepositoryImpl.updateAlert:", error);
      throw error;
    }
  }

  async closeAlert(alertId: number): Promise<Alert> {
    try {
      const result = await this.remoteDataSource.closeAlert(alertId);
      return mapDtoToAlert(result);
    } catch (error) {
      console.error("Error en AlertRepositoryImpl.closeAlert:", error);
      throw error;
    }
  }
}
