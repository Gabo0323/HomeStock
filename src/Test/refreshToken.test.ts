import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthRemoteDataSource } from "@/data/datasources/authRemoteDataSource";
import { AuthRepositoryImpl } from "@/data/repositories/authRepositoryImpl";
import { LoginUseCase } from "@/domain/useCases/loginUseCase";
import { RegisterUseCase } from "@/domain/useCases/registerUseCase";
import { RefreshUseCase } from "@/domain/useCases/refreshUseCase";
import { LogoutUseCase } from "@/domain/useCases/logoutUseCase";
import { MeUseCase } from "@/domain/useCases/meUseCase";
import { AuthViewModel } from "@/presentation/viewModels/authViewModel";

describe("🔹 Refresh Token Integration Test (Real Backend)", () => {
  let viewModel: AuthViewModel;

  beforeAll(() => {
    // Conexión real (sin mocks)
    const remote = new AuthRemoteDataSource();
    const repo = new AuthRepositoryImpl(remote);

    const loginUseCase = new LoginUseCase(repo);
    const registerUseCase = new RegisterUseCase(repo);
    const refreshUseCase = new RefreshUseCase(repo);
    const logoutUseCase = new LogoutUseCase(repo);
    const meUseCase = new MeUseCase(repo);

    viewModel = new AuthViewModel(
      loginUseCase,
      registerUseCase,
      refreshUseCase,
      logoutUseCase,
      meUseCase
    );
  });

  it("✅ debería refrescar correctamente un token real", async () => {
    const loginDto = { email: "gabo3@example.com", password: "Password123!" };

    // 1️⃣ Login real contra el backend
    const loginResponse = await viewModel.login(loginDto);
    expect(loginResponse).toBeTruthy();

    const { accessToken, refreshToken, user } = loginResponse;

    console.log("🔐 Login exitoso:");
    console.log("🧑 Usuario:", user);
    console.log("🔑 AccessToken:", accessToken);
    console.log("♻️ RefreshToken:", refreshToken);

    // 2️⃣ Guardar tokens reales
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);

    // 3️⃣ Ejecutar refresh usando los tokens guardados
    let newAccessToken: string | undefined;
    try {
      newAccessToken = await viewModel.refresh();
      console.log("✅ Nuevo Access Token generado:", newAccessToken);
    } catch (err: any) {
      console.error("❌ Error al refrescar token:", err?.response?.data ?? err.message ?? err);
      throw err;
    }

    // 4️⃣ Validaciones
    expect(typeof newAccessToken).toBe("string");
    expect(newAccessToken).toBeTruthy();

    // 5️⃣ Mostrar resumen final
    console.log("🚀 Test completado con éxito.");
    console.log({
      oldAccessToken: accessToken,
      newAccessToken,
      refreshToken,
    });
  }, 20000);

  afterAll(async () => {
    // 🧹 Limpieza del almacenamiento local
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");

    console.log("🧽 Tokens eliminados del AsyncStorage tras la prueba.");
  });
});
