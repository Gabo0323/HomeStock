import { AuthViewModel } from "@/presentation/viewModels/authViewModel";

import { AuthRemoteDataSource } from "@/data/datasources/authRemoteDataSource";
import { AuthRepositoryImpl } from "@/data/repositories/authRepositoryImpl";
import { LoginUseCase } from "@/domain/useCases/loginUseCase";
import { RegisterUseCase } from "@/domain/useCases/registerUseCase";
import { RefreshUseCase } from "@/domain/useCases/refreshUseCase";
import { LogoutUseCase } from "@/domain/useCases/logoutUseCase";
import { MeUseCase } from "@/domain/useCases/meUseCase";

// datasource
const authRemote = new AuthRemoteDataSource();

// repo
const authRepo = new AuthRepositoryImpl(authRemote);

// use cases
const loginUC = new LoginUseCase(authRepo);
const registerUC = new RegisterUseCase(authRepo);
const refreshUC = new RefreshUseCase(authRepo);
const logoutUC = new LogoutUseCase(authRepo);
const meUC = new MeUseCase(authRepo);

// viewmodel listo para ser usado
export const authViewModel = new AuthViewModel(
  loginUC,
  registerUC,
  refreshUC,
  logoutUC,
  meUC
);
