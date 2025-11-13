import { AuthRepositoryImpl } from "@/data/repositories/authRepositoryImpl";
import { RegisterUseCase } from "@/domain/useCases/registerUseCase";
import { LoginUseCase } from "@/domain/useCases/loginUseCase";
import { RefreshUseCase } from "@/domain/useCases/refreshUseCase";
import { LogoutUseCase } from "@/domain/useCases/logoutUseCase";
import { MeUseCase } from "@/domain/useCases/meUseCase";
import { AuthViewModel } from "@/presentation/viewModels/authViewModel";
import { AuthRemoteDataSource } from "@/data/datasources/authRemoteDataSource";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("🔹 Register Integration Test", () => {
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
    await AsyncStorage.clear();
  });

it("✅ debería registrar un nuevo usuario real en backend y luego hacer login", async () => {
  const userNumber = 13;
  const dto = {
    email: `gabo${userNumber}@example.com`,
    password: "Password123!",
    name: `Gabo${userNumber}`,
  };

  // 1️⃣ Registrar usuario
  const user = await viewModel.register(dto);
  expect(user).toBeDefined();
  expect(user.email).toBe(dto.email);

  // 2️⃣ Hacer login para obtener tokens
  const loginResponse = await viewModel.login({ email: dto.email, password: dto.password });

  expect(loginResponse.accessToken).toBeDefined();
  expect(loginResponse.refreshToken).toBeDefined();

  // 3️⃣ Verificar almacenamiento en AsyncStorage
  const storedAccess = await AsyncStorage.getItem("accessToken");
  const storedRefresh = await AsyncStorage.getItem("refreshToken");

  expect(storedAccess).toBeTruthy();
  expect(storedRefresh).toBeTruthy();

  // 4️⃣ Validar /me
  const me = await viewModel.me();
  expect(me.email).toBe(dto.email);
});

});