import { AuthRepository } from "../repositories/authRepository";

export class RefreshUseCase {
  constructor(private repo: AuthRepository) {}
  async execute(refreshToken: string) {
    return await this.repo.refresh(refreshToken);
  }
}
