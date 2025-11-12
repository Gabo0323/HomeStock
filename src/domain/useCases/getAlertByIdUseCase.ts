import { Alert } from "@/domain/entities/alertEntity";
import { AlertRepository } from "@/domain/repositories/alertRepository";

export class GetAlertByIdUseCase {
  private alertRepository: AlertRepository;

  constructor(alertRepository: AlertRepository) {
    this.alertRepository = alertRepository;
  }

  async execute(alertId: number): Promise<Alert> {
    return await this.alertRepository.getAlertById(alertId);
  }
}
