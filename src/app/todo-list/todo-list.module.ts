import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { TodoListRoutesModule } from './todo-list-routes.module';
import { TodoItemComponent } from './todo-item/todo-item.component';


@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    TodoListRoutesModule,
    TodoItemComponent
  ],
  exports: [
    TodoListComponent
  ]
})
export default class TodoListModule { }
