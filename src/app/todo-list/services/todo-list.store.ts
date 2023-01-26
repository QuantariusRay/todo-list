import { Task, TaskType } from "../models/task.interface";
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';

interface TodoListState {
  tasks: Task[]
}

@Injectable()
export class TodoListStore extends ComponentStore<TodoListState> {

  public readonly tasks$: Observable<Task[]> = this.select((state) => state.tasks);

  public readonly addTask = this.effect((description$: Observable<string>) =>
    description$.pipe(
      tapResponse((des) => {
        const newList = [{ description: des, status: TaskType.pending, id: (this.get().tasks.length + 1) }, ...this.get().tasks]
        this.updateTasks(newList);
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
          this.updateTasks([...this.get().tasks]);
        }
      },
        (err) => console.error(err)
      )
    )
  );

  public readonly removeTask = this.effect((id$: Observable<number>) =>
    id$.pipe(
      tapResponse(id => {
        const newTaskList = this.get().tasks.filter(task => task.id !== id);

        this.updateTasks(newTaskList);
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
