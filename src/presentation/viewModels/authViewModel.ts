import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable, action } from "mobx";
import { LoginDto } from "@/data/dto/loginDto";
import { RegisterDto } from "@/data/dto/registerDto";
import { User } from "@/domain/entities/userEntity";
import { LoginUseCase } from "@/domain/useCases/loginUseCase";
import { RegisterUseCase } from "@/domain/useCases/registerUseCase";
import { RefreshUseCase } from "@/domain/useCases/refreshUseCase";
import { LogoutUseCase } from "@/domain/useCases/logoutUseCase";
import { MeUseCase } from "@/domain/useCases/meUseCase";

/**
 * AuthViewModel — coordina la lógica de autenticación.
 * Usa inyección de dependencias (los casos de uso se inyectan desde el test o un contenedor).
 */
export class AuthViewModel {
  private readonly loginUseCase: LoginUseCase;
  private readonly registerUseCase: RegisterUseCase;
  private readonly refreshTokenUseCase: RefreshUseCase;
  private readonly logoutUseCase: LogoutUseCase;
  private readonly meUseCase: MeUseCase;
  user: any;

  constructor(
    loginUseCase: LoginUseCase,
    registerUseCase: RegisterUseCase,
    refreshTokenUseCase: RefreshUseCase,
    logoutUseCase: LogoutUseCase,
    meUseCase: MeUseCase
  ) {
    makeAutoObservable(this); // 🔧 FIX: Hacer observable para MobX
    this.loginUseCase = loginUseCase;
    this.registerUseCase = registerUseCase;
    this.refreshTokenUseCase = refreshTokenUseCase;
    this.logoutUseCase = logoutUseCase;
    this.meUseCase = meUseCase;
  }

  /**
   * Realiza el registro de un nuevo usuario
   */
  async register(dto: RegisterDto): Promise<User> {
    const user = await this.registerUseCase.execute(dto);
    return user;
  }

  /**
   * Realiza el login y guarda los tokens localmente
   */
  async login(dto: LoginDto): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const { user, accessToken, refreshToken } = await this.loginUseCase.execute(dto);

    // Guarda los tokens en el almacenamiento local
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);

    // 🔧 FIX: Asignar el usuario al ViewModel después del login
    this.user = user;
    console.log('✅ [AuthViewModel] Usuario logueado y asignado:', user);

    // ✅ Devuelve el objeto completo (útil para los tests y refresh)
    return { user, accessToken, refreshToken };
  }

  /**
   * Refresca el token de acceso usando el refresh token almacenado
   */
  async refresh(): Promise<string> {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No hay refreshToken almacenado");

    const newAccessToken = await this.refreshTokenUseCase.execute(refreshToken);
    await AsyncStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  }

  /**
   * Realiza el logout y limpia los tokens locales
   */
  @action
  async logout(): Promise<void> {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (refreshToken) {
      await this.logoutUseCase.execute(refreshToken);
    }
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    
    // 🔧 FIX: Limpiar el usuario del ViewModel
    this.user = null;
    console.log('✅ [AuthViewModel] Usuario deslogueado y limpiado');
  }

  /**
   * Devuelve la información del usuario actual
   */
  @action
  async me(): Promise<User> {
    const user = await this.meUseCase.execute();
    this.user = user; // 🔧 FIX: Asignar el usuario al ViewModel
    console.log('✅ [AuthViewModel] Usuario cargado y asignado:', user);
    return user;
  }
}
