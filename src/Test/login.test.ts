import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthRepositoryImpl } from "@/data/repositories/authRepositoryImpl";
import { LoginUseCase } from "@/domain/useCases/loginUseCase";
import { RegisterUseCase } from "@/domain/useCases/registerUseCase";
import { RefreshUseCase } from "@/domain/useCases/refreshUseCase";
import { LogoutUseCase } from "@/domain/useCases/logoutUseCase";
import { MeUseCase } from "@/domain/useCases/meUseCase";
import { AuthViewModel } from "@/presentation/viewModels/authViewModel";
import { AuthRemoteDataSource } from "@/data/datasources/authRemoteDataSource";

describe("🔹 Login Integration Test", () => {
  let viewModel: AuthViewModel;
  const credentials = {
    email: "gabo3@example.com",
    password: "Password123!",
  };

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

  it("✅ debería loguear un usuario existente y guardar tokens correctamente", async () => {
    const response = await viewModel.login(credentials);

    // ✅ Verifica que se devuelvan los datos esperados
    expect(response).toBeTruthy();
    expect(response.user.email).toBe(credentials.email);
    expect(typeof response.accessToken).toBe("string");
    expect(typeof response.refreshToken).toBe("string");

    // ✅ Verifica que los tokens se guardaron en AsyncStorage
    const storedAccessToken = await AsyncStorage.getItem("accessToken");
    const storedRefreshToken = await AsyncStorage.getItem("refreshToken");

    expect(storedAccessToken).toBe(response.accessToken);
    expect(storedRefreshToken).toBe(response.refreshToken);

    // 🧩 Muestra los valores en consola (para depuración)
    console.log("🔐 Usuario autenticado:");
    console.log("📧 Email:", response.user.email);
    console.log("🔑 Access Token:", response.accessToken);
    console.log("♻️ Refresh Token:", response.refreshToken);
  }, 15000); // tiempo extendido para llamadas reales
});
