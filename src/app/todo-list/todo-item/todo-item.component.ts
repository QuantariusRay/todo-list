import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.interface';
import { TodoListStore } from '../services/todo-list.store';
import { TaskCounterPipe } from '../pipes/task-counter.pipe';

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [CommonModule, TaskCounterPipe],
  template: `
    <ng-container *ngIf="!editing; else edit">
      <span>{{ task?.description | titlecase | taskCounter:count }}</span>
      <div class="actions">
        <button data-attr="edit-button" (click)="editing = true">Edit</button>
        <button data-attr="update-button" (click)="store.removeTask(task?.id)">X</button>
      </div>
    </ng-container>

    <ng-template #edit>
      <input #newValue/>
      <div class="actions">
        <button (click)="editing = false">X</button>
        <button (click)="store.updateTask({ task: task, newDesc: newValue.value }); editing = false">Update</button>
      </div>
    </ng-template>
  `,
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  constructor(public store: TodoListStore) {
  }
  @Input() task!: Task;
  @Input() count!: number;

  public editing: boolean = false;
}
