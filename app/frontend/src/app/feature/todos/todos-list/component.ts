import { Component, EventEmitter, Input, Output } from '@angular/core';

import { List } from 'immutable';
import { Todo } from '@app/shared/models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './component.html',
  styleUrls: ['./component.styl']
})
export class TodosListComponent {

  @Input() public todos: List<Todo>;

  @Output() public toggle = new EventEmitter<Todo>();
  @Output() public remove = new EventEmitter<Todo>();

  public onToggle(todo: Todo) {
    this.toggle.emit(todo);
  }

  public onRemove(todo: Todo) {
   this.remove.emit(todo);
  }

  public leftTodos() {
    return this.todos.filter(todo => !todo.completed);
  }

  constructor() { }

}
