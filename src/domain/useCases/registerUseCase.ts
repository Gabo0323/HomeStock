import { AuthRepository } from "../repositories/authRepository";
import { RegisterDto } from "../../data/dto/registerDto";

export class RegisterUseCase {
  constructor(private repo: AuthRepository) {}
  async execute(dto: RegisterDto) {
    return await this.repo.register(dto);
  }
}
