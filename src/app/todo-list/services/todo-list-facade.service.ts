import { computed, Injectable, Signal, signal } from '@angular/core';
import { Task, TaskType } from '../models/task.interface';
import { TodoListState } from './todo-list.store';

@Injectable()
export class TodoListFacadeService {
  private state = signal<TodoListState>({
    tasks: []
  });

  readonly tasks: Signal<Task[]> = computed<Task[]>(() => this.state().tasks);

  public addTask(description: string): void {
    this.state.update((state: TodoListState): TodoListState => (
      {
        ...state,
        tasks: [{
          description,
          status: TaskType.pending,
          id: Date.now()
        }, ...state.tasks]
      })
    );
  }

  public updateTask(taskToUpdate: Task, description: string): void {
    this.state.mutate((state: TodoListState): void => {
        const task = state.tasks.find(task => task.id === taskToUpdate.id);
        if (task) {
          task.description = description;
        }
    });
  }

  public removeTask(id: number): void {
    this.state.update((state: TodoListState): TodoListState => ({
      ...state,
      tasks: state.tasks.filter(task => task.id !== id)
    }))
  }
}
