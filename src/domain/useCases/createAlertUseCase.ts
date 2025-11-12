import { Alert } from "@/domain/entities/alertEntity";
import { CreateAlertDto } from "@/data/dto/alertDto";
import { AlertRepository } from "@/domain/repositories/alertRepository";

export class CreateAlertUseCase {
  private alertRepository: AlertRepository;

  constructor(alertRepository: AlertRepository) {
    this.alertRepository = alertRepository;
  }

  async execute(dto: CreateAlertDto): Promise<Alert> {
    return await this.alertRepository.createAlert(dto);
  }
}
