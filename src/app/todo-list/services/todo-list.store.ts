import { Task, TaskType } from "../models/task.interface";
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export interface TodoListState {
  tasks: Task[]
}

@Injectable()
export class TodoListStore extends ComponentStore<TodoListState> {

  public readonly tasks$: Observable<Task[]> = this.select((state: TodoListState) => state.tasks);

  public readonly addTask = this.effect((description$: Observable<string>) =>
    description$.pipe(
      tapResponse((des) => {
        this.updateTasks([
          { description: des, status: TaskType.pending, id: Date.now() },
          ...this.get().tasks]);
      },
        (err) => console.error(err)
      )
    )
  );

  public readonly updateTask = this.effect((taskToUpdate$: Observable<{ task: Task, newDesc: string }>) =>
    taskToUpdate$.pipe(
      tapResponse(taskToUpdate => {
        const task = this.get().tasks.find(task => task.id === taskToUpdate.task.id);
        if (task) {
          task.description = taskToUpdate.newDesc;
        }
      },
        (err) => console.error(err)
      )
    )
  );

  public readonly removeTask = this.effect((id$: Observable<number>) =>
    id$.pipe(
      tapResponse(id => {
        this.updateTasks(this.get().tasks.filter(task => task.id !== id));
      },
        (err) => console.error(err))
    )
  );

  private readonly updateTasks = this.updater((state: TodoListState, tasks: Task[]) => ({
    ...state,
    tasks
  }));

  constructor() {
    super({
      tasks: []
    });
  }
}
