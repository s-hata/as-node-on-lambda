import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Todo } from '@app/shared/models/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './component.html',
  styleUrls: ['./component.styl']
})
export class TodosFormComponent {

  public form: FormGroup;
  @Output() public add = new EventEmitter<Todo>();

  public onAdd() {
    const todo = this.form.get('todo').value;
    this.add.emit(new Todo({ title: todo }));
    this.resetForm();
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.buildForm();
  }

  private buildForm() {
    return this.formBuilder.group({
      todo: ['',
        [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(256)]]
    });
  }

  private resetForm() {
    this.form.reset();
  }
}
