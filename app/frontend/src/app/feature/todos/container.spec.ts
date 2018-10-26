import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { List } from 'immutable';
import { TodosContainer } from './container';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { Subject } from 'rxjs';
import { AppState } from '@app/core/reducers';
import { TodosActions } from '@app/core/todos.actions';
import { UiActions } from '@app/core/ui.actions';
import { Todo } from '@app/shared/models/todo';

describe('TodosContainer', () => {

  let fixture: ComponentFixture<TodosContainer>;
  let component: TodosContainer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgReduxTestingModule
      ],
      declarations: [
        TodosContainer
      ],
      providers: [
        TodosActions,
        UiActions
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    MockNgRedux.reset();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosContainer);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Selects the current todos value from Redux', done => {
    const expectedValues = List([
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

    const todosStub: Subject<List<Todo>> = MockNgRedux.getSelectorStub<AppState, List<Todo>>(['todos', 'items']);
    todosStub.next(expectedValues);
    todosStub.complete();
    component.todos$.subscribe(actualValues => expect(actualValues).toEqual(expectedValues), null, done);
  });

  it('dispatches ADD when add a todo item', () => {
    const expectedValue = new Todo({
        id: 4,
        title: 'task 4',
        complete: false
    });
    const spy = spyOn(MockNgRedux.getInstance(), 'dispatch');
    component.onAdd(expectedValue);
    expect(spy).toHaveBeenCalledWith({ type: TodosActions.ADD, payload: { todo: expectedValue }});
  });

  it('dispatches REMOVE when remove a todo item', () => {
    const expectedValue = new Todo({
        id: 4,
        title: 'task 4',
        complete: false
    });
    const spy = spyOn(MockNgRedux.getInstance(), 'dispatch');
    component.onRemove(expectedValue);
    expect(spy).toHaveBeenCalledWith({ type: TodosActions.REMOVE, payload: { todo: expectedValue }});
  });

  it('dispatches UPDATE when complete a todo item', () => {
    const expectedValue = new Todo({
        id: 4,
        title: 'task 4',
        complete: false
    });
    const spy = spyOn(MockNgRedux.getInstance(), 'dispatch');
    component.onToggle(expectedValue);
    expect(spy).toHaveBeenCalledWith({ type: TodosActions.UPDATE, payload: { todo: expectedValue }});
  });
});
