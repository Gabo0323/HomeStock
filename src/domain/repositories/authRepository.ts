import { LoginDto } from "../../data/dto/loginDto";
import { RegisterDto } from "../../data/dto/registerDto";
import { User } from "../entities/userEntity";

export interface AuthRepository {
  login(dto: LoginDto): Promise<{ user: User; accessToken: string; refreshToken: string }>;
  register(dto: RegisterDto): Promise<User>;
  me(): Promise<User>;
  refresh(refreshToken: string): Promise<string>;
  logout(refreshToken: string): Promise<void>;
}
