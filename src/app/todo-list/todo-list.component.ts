import { Component } from '@angular/core';
import { TodoListStore } from './services/todo-list.store';
import { TodoListFacadeService } from './services/todo-list-facade.service';

@Component({
  selector: 'app-todo-list',
  template: `
    <h1>To Do List</h1>

    <input #newTask />
    <button (click)="facade.addTask(newTask.value); newTask.value = ''">Add Task</button>

    <ng-container *ngFor="let task of facade.tasks(); let i = index">
      <div class="item-container">
        <todo-item [task]="task" [count]="i + 1"></todo-item>
      </div>
    </ng-container>
  `,
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoListStore, TodoListFacadeService]
})
export class TodoListComponent {
  constructor(
    public readonly store: TodoListStore,
    public readonly facade: TodoListFacadeService
  ) {}
}
