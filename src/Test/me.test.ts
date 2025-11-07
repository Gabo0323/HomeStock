import { AuthRepositoryImpl } from "@/data/repositories/authRepositoryImpl";
import { LoginUseCase } from "@/domain/useCases/loginUseCase";
import { RegisterUseCase } from "@/domain/useCases/registerUseCase";
import { RefreshUseCase } from "@/domain/useCases/refreshUseCase";
import { LogoutUseCase } from "@/domain/useCases/logoutUseCase";
import { MeUseCase } from "@/domain/useCases/meUseCase";
import { AuthViewModel } from "@/presentation/viewModels/authViewModel";
import { AuthRemoteDataSource } from "@/data/datasources/authRemoteDataSource";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("🔹 Me Integration Test", () => {
  let viewModel: AuthViewModel;

  beforeAll(() => {
    const remote = new AuthRemoteDataSource();
    const repository = new AuthRepositoryImpl(remote);

    viewModel = new AuthViewModel(
      new LoginUseCase(repository),
      new RegisterUseCase(repository),
      new RefreshUseCase(repository),
      new LogoutUseCase(repository),
      new MeUseCase(repository)
    );
  });

  beforeEach(async () => {
    // Limpia el almacenamiento antes de cada test
    if (typeof AsyncStorage.clear === "function") {
      await AsyncStorage.clear();
    } else {
      // Mock fallback por si AsyncStorage se comporta distinto en Jest
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
    }
  });

  it("✅ debería obtener los datos del usuario actual desde el backend", async () => {
    // 1️⃣ Inicia sesión para obtener tokens válidos
    const credentials = { email: "gabo2@example.com", password: "Password123!" };
    const result = await viewModel.login(credentials);

    expect(result).toBeDefined();
    expect(result.user.email).toBe(credentials.email);
    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();

    // 2️⃣ Espera un poco a que el interceptor use correctamente el token
    await new Promise((r) => setTimeout(r, 500));

    // 3️⃣ Llama al endpoint /auth/me
    const me = await viewModel.me();

    // 4️⃣ Valida la respuesta del backend
    expect(me).toBeDefined();
    expect(me.email).toBe(result.user.email);
    expect(me.id).toBe(result.user.id);
    expect(me.name).toBe(result.user.name);

    // 5️⃣ Muestra datos útiles para depuración
    console.log("🧑 Usuario logueado:", result.user);
    console.log("🔑 AccessToken:", result.accessToken);
    console.log("♻️ RefreshToken:", result.refreshToken);
    console.log("📬 Datos /auth/me:", me);
  }, 15000); // aumenta timeout por las llamadas reales
});
