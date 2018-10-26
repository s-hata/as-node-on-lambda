import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { List } from 'immutable';
import { Todo } from '@app/shared/models/todo';
import { SharedModule } from '@app/shared/module';
import { TodosListComponent } from './component';
import { TodosListItemComponent } from '../todos-list-item/component';

describe('TodosListComponent', () => {

  let fixture: ComponentFixture<TodosListComponent>;
  let component: TodosListComponent;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        TodosListComponent,
        TodosListItemComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListComponent);
    component = fixture.debugElement.componentInstance;
    component.todos = List([
      new Todo({
        id: 1,
        title: 'task 1',
        completed: false
      }),
      new Todo({
        id: 2,
        title: 'task 2',
        completed: true
      }),
      new Todo({
        id: 3,
        title: 'task 3',
        completed: false
      })
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show 3 todo', () => {
    const todos = fixture.debugElement.queryAll(By.css('app-todo-list-item'));
    expect(todos.length).toBe(3);
  });

  it('should show left items count', () => {
    const count = fixture.nativeElement.querySelector('.todo-count');
    expect(count.textContent).toBe('2 items left');
  });
});
