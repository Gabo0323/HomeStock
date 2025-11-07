export interface MeResponseDto {
  id: number;
  email: string;
  name: string;
  households: unknown[];
  preferences: Record<string, unknown>;
}