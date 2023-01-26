import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { TaskType } from '../models/task.interface';
import { By } from '@angular/platform-browser';
import { TodoListStore } from '../services/todo-list.store';

fdescribe('Todo Item Component Test', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TodoItemComponent ],
      providers: [TodoListStore]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should format the description and index of a task', () => {
    component.count = 4;
    component.task = {
      description: 'test value',
      id: 0,
      status: TaskType.pending
    }
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(span.innerText).toBe('4. Test Value');
  });

  it('should allow me to edit a task', () => {
    component.count = 4;
    component.task = {
      description: 'test value',
      id: 0,
      status: TaskType.pending
    }
    fixture.detectChanges();

    const editButton = fixture.debugElement.query(By.css('[data-attr="edit-button"]')).nativeElement;
    const updateButton = fixture.debugElement.query(By.css('[data-attr="update-button"]')).nativeElement;

    editButton.click();
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    input.value = 'new value';
    updateButton.click();
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(span.innerText).toBe('4. New Value');
  })
});
