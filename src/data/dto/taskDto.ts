export interface CreateTaskDto {
  title: string;
  due: Date;
}

export interface UpdateTaskDto {
  id: number;
  title?: string;
  due?: Date;
}