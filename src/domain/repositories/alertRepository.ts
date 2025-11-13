import { Alert } from "../entities/alertEntity";
import { AlertDto, CreateAlertDto } from "../../data/dto/alertDto";

export interface AlertRepository {
  createAlert(dto: CreateAlertDto): Promise<Alert>;
  getActiveAlertsByUserId(userId: number): Promise<Alert[]>;
  //getAlertById(alertId: number): Promise<Alert>;
  updateAlert(alertId: number, dto: Partial<AlertDto>): Promise<Alert>;
  closeAlert(alertId: number): Promise<Alert>;
}
