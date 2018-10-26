import { Injectable } from '@angular/core';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UiActions, UiAction } from './ui.actions';
import { TodosActions, TodosAction } from './todos.actions';
import { TodosService } from './todos.service';


@Injectable()
export class TodosEpics {
  public load = (action$: ActionsObservable<TodosAction>) => {
    return action$.pipe(
      ofType(TodosActions.LOAD),
      switchMap(action => {
        return this.service.load().pipe(
          map((todos) => this.actions.loadSuccess(todos)),
          catchError((error) => of(this.actions.loadFail(error.message))));
      }));
  }

  public loadFail = (action$: ActionsObservable<TodosAction>) => {
    return action$.pipe(
      ofType(TodosActions.LOAD_FAIL),
      switchMap(action => of(this.uis.showMessage(action.payload.message)))
    );
  }

  public add = (action$: ActionsObservable<TodosAction>) => {
    return action$.ofType(TodosActions.ADD).pipe(
      switchMap(action => {
        return this.service.add(action.payload.todo).pipe(
          map(todo => this.actions.addSuccess(todo)),
          catchError(error => of(this.actions.addFail(error.message))));
      }));
  }

  public addFail = (action$: ActionsObservable<TodosAction>) => {
    return action$.pipe(
      ofType(TodosActions.ADD_FAIL),
      switchMap(action => of(this.uis.showMessage(action.payload.message)))
    );
  }

  public update = (action$: ActionsObservable<TodosAction>) => {
    return action$.ofType(TodosActions.UPDATE).pipe(
      switchMap(action => {
        return this.service.update(action.payload.todo).pipe(
          map(todo => this.actions.updateSuccess(action.payload.todo)),
          catchError(error => of(this.actions.updateFail(error.message))));
      }));
  }

  public updateFail = (action$: ActionsObservable<TodosAction>) => {
    return action$.pipe(
      ofType(TodosActions.UPDATE_FAIL),
      switchMap(action => of(this.uis.showMessage(action.payload.message)))
    );
  }

  public remove = (action$: ActionsObservable<TodosAction>) => {
    return action$.ofType(TodosActions.REMOVE).pipe(
      switchMap(action => {
        return this.service.remove(action.payload.todo).pipe(
          map(todo => this.actions.removeSuccess(action.payload.todo)),
          catchError(error => of(this.actions.removeFail(error.message))));
      }));
  }

  public removeFail = (action$: ActionsObservable<TodosAction>) => {
    return action$.pipe(
      ofType(TodosActions.REMOVE_FAIL),
      switchMap(action => of(this.uis.showMessage(action.payload.message)))
    );
  }

  constructor(
    private actions: TodosActions,
    private uis: UiActions,
    private service: TodosService
  ) { }
}
