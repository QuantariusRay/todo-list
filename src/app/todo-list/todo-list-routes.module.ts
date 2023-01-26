import { RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: TodoListComponent
    }])
  ],
  exports: [RouterModule]
})
export class TodoListRoutesModule {}
