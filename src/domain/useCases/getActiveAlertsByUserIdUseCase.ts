import { Alert } from "@/domain/entities/alertEntity";
import { AlertRepository } from "@/domain/repositories/alertRepository";

export class GetActiveAlertsByUserIdUseCase {
  private alertRepository: AlertRepository;

  constructor(alertRepository: AlertRepository) {
    this.alertRepository = alertRepository;
  }

  async execute(userId: number): Promise<Alert[]> {
    return await this.alertRepository.getActiveAlertsByUserId(userId);
  }
}
