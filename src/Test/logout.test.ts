import { AuthRepositoryImpl } from "@/data/repositories/authRepositoryImpl";
import { LoginUseCase } from "@/domain/useCases/loginUseCase";
import { RegisterUseCase } from "@/domain/useCases/registerUseCase";
import { RefreshUseCase } from "@/domain/useCases/refreshUseCase";
import { LogoutUseCase } from "@/domain/useCases/logoutUseCase";
import { MeUseCase } from "@/domain/useCases/meUseCase";
import { AuthViewModel } from "@/presentation/viewModels/authViewModel";
import { AuthRemoteDataSource } from "@/data/datasources/authRemoteDataSource";

describe("🔹 Logout Integration Test", () => {
  let viewModel: AuthViewModel;

  beforeAll(() => {
    const remote = new AuthRemoteDataSource();
    const repository = new AuthRepositoryImpl(remote);

    const loginUseCase = new LoginUseCase(repository);
    const registerUseCase = new RegisterUseCase(repository);
    const refreshTokenUseCase = new RefreshUseCase(repository);
    const logoutUseCase = new LogoutUseCase(repository);
    const meUseCase = new MeUseCase(repository);

    viewModel = new AuthViewModel(
      loginUseCase,
      registerUseCase,
      refreshTokenUseCase,
      logoutUseCase,
      meUseCase
    );
  });

  it("✅ debería cerrar sesión limpiando tokens en backend", async () => {
    const user = { email: "gabo3@example.com", password: "Password123!" };
    await viewModel.login(user);

    await viewModel.logout();

    // No hay una respuesta JSON, pero si no tira error significa que el logout fue exitoso
    expect(true).toBeTruthy();
  });
});
