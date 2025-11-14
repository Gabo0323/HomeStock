import { authViewModel } from "./authContainer";

import { AlertRemoteDataSource } from "@/data/datasources/alertRemoteDataSource";
import { AlertRepositoryImpl } from "@/data/repositories/alertRepositoryImpl";

import { CreateAlertUseCase } from "@/domain/useCases/createAlertUseCase";
import { GetActiveAlertsByUserIdUseCase } from "@/domain/useCases/getActiveAlertsByUserIdUseCase";
//import { GetAlertByIdUseCase } from "@/domain/useCases/getAlertByIdUseCase";
import { UpdateAlertUseCase } from "@/domain/useCases/updateAlertUseCase";
import { CloseAlertUseCase } from "@/domain/useCases/closeAlertUseCase";

import { AlertViewModel } from "@/presentation/viewModels/alertViewModel";

// datasource
const alertRemote = new AlertRemoteDataSource();

// repository
const alertRepo = new AlertRepositoryImpl(alertRemote);

// use cases
const createUC = new CreateAlertUseCase(alertRepo);
const getActiveUC = new GetActiveAlertsByUserIdUseCase(alertRepo);
//const getByIdUC = new GetAlertByIdUseCase(alertRepo);
const updateUC = new UpdateAlertUseCase(alertRepo);
const closeUC = new CloseAlertUseCase(alertRepo);

export const alertViewModel = new AlertViewModel(
  createUC,
  getActiveUC,
  //getByIdUC,
  updateUC,
  closeUC
);

export { authViewModel };
