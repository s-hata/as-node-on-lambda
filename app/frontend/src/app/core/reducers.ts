import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { List } from 'immutable';
import { todosReducer } from './todos.reducer';
import { uiReducer, UiState } from './ui.reducer';
import { Todo } from '@app/shared/models/todo';

export interface AppState {
  todos: List<Todo>;
  ui: UiState;
}

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    todos: todosReducer,
    ui: uiReducer,
    router: routerReducer
  })
);
