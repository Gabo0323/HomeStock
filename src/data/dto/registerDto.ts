export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponseDto {
  id: number;
  email: string;
  name: string;
  createdAt: string; 
}