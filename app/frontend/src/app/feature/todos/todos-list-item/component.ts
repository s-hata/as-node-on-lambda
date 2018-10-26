import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Todo } from '@app/shared/models/todo';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './component.html',
  styleUrls: ['./component.styl']
})
export class TodosListItemComponent {

  public faTrash = faTrash;
  public editable = false;

  @Input()
  public todo: Todo;

  @Output()
  public toggle: EventEmitter<Todo> = new EventEmitter();

  @Output()
  public remove: EventEmitter<Todo> = new EventEmitter();

  public onToggle(todo: Todo) {
    const data = new Todo({ id: todo.id, title: todo.title, completed: !todo.completed });
    this.toggle.emit(data);
  }

  public onRemove(todo: Todo) {
    this.remove.emit(todo);
  }

  public onEditable(todo: Todo) {
    this.editable = !this.editable;
    if (todo) {
      this.toggle.emit(todo);
    }
  }

  constructor() { }

}
