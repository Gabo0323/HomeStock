import { AuthRepository } from "../repositories/authRepository";
import { LoginDto } from "../../data/dto/loginDto";

export class LoginUseCase {
  constructor(private repo: AuthRepository) {}
  async execute(dto: LoginDto) {
    return await this.repo.login(dto);
  }
}
