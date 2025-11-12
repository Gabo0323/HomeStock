import { makeAutoObservable } from "mobx";
import { CreateMovementUseCase } from "@/domain/useCases/createMovementUseCase";
import { CreateMovementDto } from "@/data/dto/movementDto";
import { Movement } from "@/domain/entities/movementEntity";

export class MovementViewModel {
  private createMovementUseCase: CreateMovementUseCase;

  movement: Movement | null = null;
  movements: Movement[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(createMovementUseCase: CreateMovementUseCase) {
    makeAutoObservable(this);
    this.createMovementUseCase = createMovementUseCase;
  }

  async createMovement(dto: CreateMovementDto) {
    this.loading = true;
    this.error = null;

    try {
      const result = await this.createMovementUseCase.execute(dto);
      this.movement = result;
      // Agregamos el movimiento recién creado a la lista local
      this.movements.push(result);
    } catch (err: any) {
      this.error = err.message || "Error al crear movimiento";
    } finally {
      this.loading = false;
    }
  }
}
