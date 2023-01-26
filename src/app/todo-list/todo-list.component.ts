import { Component } from '@angular/core';
import { TodoListStore } from './services/todo-list.store';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoListStore]
})
export class TodoListComponent {
  constructor(public readonly store: TodoListStore) {}
}
