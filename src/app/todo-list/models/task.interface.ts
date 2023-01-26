export enum TaskType {
  pending,
  complete
}
export interface Task {
  status: TaskType;
  description: string;
  id: number;
}
