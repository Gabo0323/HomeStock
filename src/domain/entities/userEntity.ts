export interface User {
  id: number;
  email: string;
  name: string;
  createdAt?: Date;
  households?: unknown[];
  preferences?: Record<string, unknown>;
}