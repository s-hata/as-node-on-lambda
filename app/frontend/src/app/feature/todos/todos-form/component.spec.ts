import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TodosFormComponent } from './component';


class Page {

  get button() {
    return this.query<HTMLButtonElement>('button');
  }

  get todoInput() {
    return this.query<HTMLInputElement>('input');
  }

  addTodo(todo: string) {
    this.todoInput.value = todo;
    this.todoInput.dispatchEvent(new Event('input'));
    this.fixture.detectChanges();
  }

  constructor(private fixture: ComponentFixture<TodosFormComponent>) { }

  private query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}

describe('TodosFormComponent', () => {

  let fixture: ComponentFixture<TodosFormComponent>;
  let component: TodosFormComponent;
  let page: Page;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ TodosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosFormComponent);
    component = fixture.debugElement.componentInstance;
    page = new Page(fixture);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(component.form instanceof FormGroup).toBeTruthy();
    expect(component.form.invalid).toBeTruthy();
  });

  it('should create a FormControl for todo', () => {
    expect(Object.keys(component.form.controls)).toEqual(['todo']);
  });

  it('should button is disabled', () => {
    expect(page.button.disabled).toBeTruthy();
  });

  it('should todo input is focused', () => {
    expect(page.todoInput.placeholder).toBe('What needs to be done?');
  });

  it('should button is enable', () => {
    page.addTodo('task 99');
    expect(page.button.disabled).toBeFalsy();
  });

  it('should add method is called when button is clicked', fakeAsync(() => {
    spyOn(component, 'onAdd');
    page.addTodo('task 99');
    page.button.click();
    expect(component.onAdd).toHaveBeenCalled();
  }));
});
