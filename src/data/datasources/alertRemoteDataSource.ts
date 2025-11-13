import { axiosClient } from "../../api/axiosClient";
import { AlertDto, CreateAlertDto } from "../dto/alertDto";

export class AlertRemoteDataSource {
  
  // Crear nueva alerta
  async createAlert(dto: CreateAlertDto): Promise<AlertDto> {
    try {
      const response = await axiosClient.post("/alerts", dto);
      return response.data;
    } catch (error: any) {
      console.error("Error al crear alerta:", error);
      throw error;
    }
  }

  // Obtener alertas activas de un usuario
  async getActiveAlertsByUserId(userId: number): Promise<AlertDto[]> {
    try {
      const response = await axiosClient.get(`/users/${userId}/alerts/active`);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener alertas activas:", error);
      throw error;
    }
  }

  // Actualizar una alerta específica
  async updateAlert(alertId: number, dto: Partial<AlertDto>): Promise<AlertDto> {
    try {
      const response = await axiosClient.patch(`/alerts/${alertId}`, dto);
      return response.data;
    } catch (error: any) {
      console.error("Error al actualizar alerta:", error);
      throw error;
    }
  }

  // Cerrar una alerta (cambia active a false y agrega resolvedAt)
  async closeAlert(alertId: number): Promise<AlertDto> {
    try {
      const response = await axiosClient.patch(`/alerts/${alertId}/close`);
      return response.data;
    } catch (error: any) {
      console.error("Error al cerrar alerta:", error);
      throw error;
    }
  }
/*
  // Obtener alerta por ID (por si se necesita en pantalla de detalle)
  async getAlertById(alertId: number): Promise<AlertDto> {
    try {
      const response = await axiosClient.get(`/alerts/${alertId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener alerta por ID:", error);
      throw error;
    }
  }*/
}
