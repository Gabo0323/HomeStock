import { makeAutoObservable } from "mobx";
import { Alert } from "@/domain/entities/alertEntity";
import { CreateAlertDto, AlertDto } from "@/data/dto/alertDto";
import { CreateAlertUseCase } from "@/domain/useCases/createAlertUseCase";
import { GetActiveAlertsByUserIdUseCase } from "@/domain/useCases/getActiveAlertsByUserIdUseCase";
import { GetAlertByIdUseCase } from "@/domain/useCases/getAlertByIdUseCase";
import { UpdateAlertUseCase } from "@/domain/useCases/updateAlertUseCase";
import { CloseAlertUseCase } from "@/domain/useCases/closeAlertUseCase";



export class AlertViewModel {
  private createAlertUseCase: CreateAlertUseCase;
  private getActiveAlertsByUserIdUseCase: GetActiveAlertsByUserIdUseCase;
  private getAlertByIdUseCase: GetAlertByIdUseCase;
  private updateAlertUseCase: UpdateAlertUseCase;
  private closeAlertUseCase: CloseAlertUseCase;

  alert: Alert | null = null;
  alerts: Alert[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    createAlertUseCase: CreateAlertUseCase,
    getActiveAlertsByUserIdUseCase: GetActiveAlertsByUserIdUseCase,
    getAlertByIdUseCase: GetAlertByIdUseCase,
    updateAlertUseCase: UpdateAlertUseCase,
    closeAlertUseCase: CloseAlertUseCase
  ) {
    makeAutoObservable(this);
    this.createAlertUseCase = createAlertUseCase;
    this.getActiveAlertsByUserIdUseCase = getActiveAlertsByUserIdUseCase;
    this.getAlertByIdUseCase = getAlertByIdUseCase;
    this.updateAlertUseCase = updateAlertUseCase;
    this.closeAlertUseCase = closeAlertUseCase;
  }

  async createAlert(dto: CreateAlertDto) {
    this.loading = true;
    this.error = null;
    try {
      const result = await this.createAlertUseCase.execute(dto);
      this.alert = result;
      // Agregamos la alerta creada a la lista existente
      this.alerts.push(result);
    } catch (err: any) {
      this.error = err.message || "Error al crear alerta";
    } finally {
      this.loading = false;
    }
  }

  async getActiveAlertsByUserId(userId: number) {
    this.loading = true;
    this.error = null;
    try {
      this.alerts = await this.getActiveAlertsByUserIdUseCase.execute(userId);
    } catch (err: any) {
      this.error = err.message || "Error al obtener alertas activas";
    } finally {
      this.loading = false;
    }
  }

  async getAlertById(alertId: number) {
    this.loading = true;
    this.error = null;
    try {
      this.alert = await this.getAlertByIdUseCase.execute(alertId);
    } catch (err: any) {
      this.error = err.message || "Error al obtener alerta";
    } finally {
      this.loading = false;
    }
  }

  async updateAlert(alertId: number, dto: Partial<AlertDto>) {
    this.loading = true;
    this.error = null;
    try {
      this.alert = await this.updateAlertUseCase.execute(alertId, dto);
      // Actualiza también la lista
      this.alerts = this.alerts.map(a =>
        a.id === alertId ? this.alert! : a
      );
    } catch (err: any) {
      this.error = err.message || "Error al actualizar alerta";
    } finally {
      this.loading = false;
    }
  }

  async closeAlert(alertId: number) {
    this.loading = true;
    this.error = null;
    try {
      const closedAlert = await this.closeAlertUseCase.execute(alertId);
      this.alert = closedAlert;
      this.alerts = this.alerts.map(a =>
        a.id === alertId ? closedAlert : a
      );
    } catch (err: any) {
      this.error = err.message || "Error al cerrar alerta";
    } finally {
      this.loading = false;
    }
  }
}
