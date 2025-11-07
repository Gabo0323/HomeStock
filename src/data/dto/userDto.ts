export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserDto {
  id: string;
  name?: string;
  email?: string;
}

export interface UserProfileDto {
  id: number;
  email: string;
  name: string;
  households: any[];
  preferences: Record<string, any>;
}
