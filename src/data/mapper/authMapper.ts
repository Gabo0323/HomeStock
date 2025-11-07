
import { User } from "../../domain/entities/userEntity";
import { LoginResponseDto } from "../dto/loginDto";
import { MeResponseDto } from "../dto/meDto";
import { RegisterResponseDto } from "../dto/registerDto";

export const UserMapper = {
  fromLoginResponseDto(dto: LoginResponseDto): User {
    return {
      id: dto.user.id,
      email: dto.user.email,
      name: dto.user.name,
    };
  },

  fromRegisterResponseDto(dto: RegisterResponseDto): User {
    return {
      id: dto.id,
      email: dto.email,
      name: dto.name,
      createdAt: new Date(dto.createdAt),
    };
  },

  fromMeResponseDto(dto: MeResponseDto): User {
    return {
      id: dto.id,
      email: dto.email,
      name: dto.name,
      households: dto.households,
      preferences: dto.preferences,
    };
  },
};
