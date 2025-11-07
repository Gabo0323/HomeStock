import { axiosClient } from "../../api/axiosClient";
import { LoginDto, LoginResponseDto } from "../dto/loginDto";
import { MeResponseDto } from "../dto/meDto";
import { RefreshResponseDto } from "../dto/refreshDto";
import { RegisterDto, RegisterResponseDto } from "../dto/registerDto";


export class AuthRemoteDataSource {
  async register(dto: RegisterDto): Promise<RegisterResponseDto> {
    const resp = await axiosClient.post<RegisterResponseDto>("/auth/register", dto);
    return resp.data;
  }

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const resp = await axiosClient.post<LoginResponseDto>("/auth/login", dto);
    return resp.data;
  }

  async me(): Promise<MeResponseDto> {
    const resp = await axiosClient.get<MeResponseDto>("/auth/me");
    return resp.data;
  }

  async refresh(refreshToken: string): Promise<RefreshResponseDto> {
    const resp = await axiosClient.post<RefreshResponseDto>("/auth/refresh", { refreshToken });
    return resp.data;
  }

  async logout(refreshToken: string): Promise<void> {
    await axiosClient.post("/auth/logout", { refreshToken });
  }

  
}
