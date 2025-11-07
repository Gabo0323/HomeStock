import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthRemoteDataSource } from "../datasources/authRemoteDataSource";
import { AuthRepository } from "../../domain/repositories/authRepository";
import { LoginDto } from "../dto/loginDto";
import { RegisterDto } from "../dto/registerDto";
import { UserMapper } from "../mapper/authMapper";
import { User } from "../../domain/entities/userEntity";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private remote: AuthRemoteDataSource) {}

  async login(dto: LoginDto): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const response = await this.remote.login(dto);
    const user = UserMapper.fromLoginResponseDto(response);
    await AsyncStorage.setItem("accessToken", response.accessToken);
    await AsyncStorage.setItem("refreshToken", response.refreshToken);
    return { user, accessToken: response.accessToken, refreshToken: response.refreshToken };
  }

  async register(dto: RegisterDto): Promise<User> {
    const response = await this.remote.register(dto);
    return UserMapper.fromRegisterResponseDto(response);
  }

  async me(): Promise<User> {
    const response = await this.remote.me();
    return UserMapper.fromMeResponseDto(response);
  }

  async refresh(refreshToken: string): Promise<string> {
    const response = await this.remote.refresh(refreshToken);
    await AsyncStorage.setItem("accessToken", response.accessToken);
    return response.accessToken;
  }

  async logout(refreshToken: string): Promise<void> {
    await this.remote.logout(refreshToken);
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
  }

}
