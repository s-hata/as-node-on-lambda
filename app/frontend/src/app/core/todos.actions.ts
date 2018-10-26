import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { List } from 'immutable';
import { Todo } from '@app/shared/models/todo';


export class TodosAction implements Action {
  public type: string;
  public payload?: any;
}

@Injectable()
export class TodosActions {
  static readonly LOAD = 'LOAD';
  static readonly LOAD_SUCCESS = 'LOAD_SUCCESS';
  static readonly LOAD_FAIL = 'LOAD_FAIL';
  static readonly ADD = 'ADD';
  static readonly ADD_SUCCESS = 'ADD_SUCCESS';
  static readonly ADD_FAIL = 'ADD_FAIL';
  static readonly UPDATE = 'UPDATE';
  static readonly UPDATE_SUCCESS = 'UPDATE_SUCCESS';
  static readonly UPDATE_FAIL = 'UPDATE_FAIL';
  static readonly REMOVE = 'REMOVE';
  static readonly REMOVE_SUCCESS = 'REMOVE_SUCCESS';
  static readonly REMOVE_FAIL = 'REMOVE_FAIL';

  public load(): TodosAction {
    return {
      type: TodosActions.LOAD
    };
  }

  public loadSuccess(todos: List<Todo>): TodosAction {
    return {
      type: TodosActions.LOAD_SUCCESS,
      payload: { todos: todos }
    };
  }

  public loadFail(message: string): TodosAction {
    return {
      type: TodosActions.LOAD_FAIL,
      payload: { message: message }
    };
  }

  public add(todo: Todo): TodosAction {
    return {
      type: TodosActions.ADD,
      payload: { todo: todo }
    };
  }

  public addSuccess(todo: Todo): TodosAction {
    return {
      type: TodosActions.ADD_SUCCESS,
      payload: { todo: todo }
    };
  }

  public addFail(message: string): TodosAction {
    return {
      type: TodosActions.ADD_FAIL,
      payload: { message: message }
    };
  }

  public update(todo: Todo): TodosAction {
    return {
      type: TodosActions.UPDATE,
      payload: { todo: todo }
    };
  }

  public updateSuccess(todo: Todo): TodosAction {
    return {
      type: TodosActions.UPDATE_SUCCESS,
      payload: { todo: todo }
    };
  }

  public updateFail(message: string): TodosAction {
    return {
      type: TodosActions.UPDATE_FAIL,
      payload: { message: message}
    };
  }

  public remove(todo: Todo): TodosAction {
    return {
      type: TodosActions.REMOVE,
      payload: { todo: todo }
    };
  }

  public removeSuccess(todo: Todo): TodosAction {
    return {
      type: TodosActions.REMOVE_SUCCESS,
      payload: { todo: todo }
    };
  }

  public removeFail(message: string): TodosAction {
    return {
      type: TodosActions.REMOVE_FAIL,
      payload: { message: message}
    };
  }
}
