import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '@app/shared/module';
import { TodosListItemComponent } from './component';
import { Todo } from '@app/shared/models/todo';

describe('TodosListItemComponent', () => {

  let fixture: ComponentFixture<TodosListItemComponent>;
  let component: TodosListItemComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        TodosListItemComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListItemComponent);
    component = fixture.componentInstance;
    component.todo = new Todo({
      id: 1,
      title: 'task 1',
      complete: true
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should label is task 1', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent).toBe('task 1');
  });

  it('should checkbox is false', () => {
    const complete = fixture.nativeElement.querySelector('input');
    expect(complete.value).toBe('on');
  });

  it('should show a remove icon', () => {
    const button = fixture.nativeElement.querySelector('fa-icon');
    expect(button).toBeTruthy();
  });
});
