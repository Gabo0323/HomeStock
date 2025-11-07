import { AuthRepository } from "../repositories/authRepository";

export class LogoutUseCase {
  constructor(private repo: AuthRepository) {}
  async execute(refreshToken: string) {
    return await this.repo.logout(refreshToken);
  }
}
