import { AuthRepository } from "@/domain/repositories/authRepository";
import { User } from "@/domain/entities/userEntity";

/**
 * Caso de uso que obtiene el usuario actual autenticado.
 * Equivalente al endpoint /me del backend.
 */
export class MeUseCase {
  private readonly repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async execute(): Promise<User> {
    return await this.repository.me();
  }
}