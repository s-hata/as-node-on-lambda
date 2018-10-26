import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { AppState } from '@app/core/reducers';
import { UiActions } from '@app/core/ui.actions';
import { TodosActions } from '@app/core/todos.actions';
import { Todo } from '@app/shared/models/todo';


@Component({
  templateUrl: './container.html',
  styleUrls: ['./container.styl']
})
export class TodosContainer {

  @select([ 'todos', 'items' ]) public readonly todos$: Observable<List<Todo>>;
  @select([ 'ui', 'message' ]) public readonly message$: Observable<string>;

  public onAdd(todo: Todo) {
    this.ngRedux.dispatch(this.uis.cleanMessage());
    this.ngRedux.dispatch(this.actions.add(todo));
  }

  public onRemove(todo: Todo) {
    this.ngRedux.dispatch(this.uis.cleanMessage());
    this.ngRedux.dispatch(this.actions.remove(todo));
  }

  public onToggle(todo: Todo) {
    this.ngRedux.dispatch(this.uis.cleanMessage());
    this.ngRedux.dispatch(this.actions.update(todo));
  }

  constructor(
    private ngRedux: NgRedux<AppState>,
    private actions: TodosActions,
    private uis: UiActions
  ) {
    this.ngRedux.dispatch(this.actions.load());
  }
}
