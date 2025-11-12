import { Alert } from "@/domain/entities/alertEntity";
import { AlertDto } from "@/data/dto/alertDto";
import { AlertRepository } from "@/domain/repositories/alertRepository";

export class UpdateAlertUseCase {
  private alertRepository: AlertRepository;

  constructor(alertRepository: AlertRepository) {
    this.alertRepository = alertRepository;
  }

  async execute(alertId: number, dto: Partial<AlertDto>): Promise<Alert> {
    return await this.alertRepository.updateAlert(alertId, dto);
  }
}
