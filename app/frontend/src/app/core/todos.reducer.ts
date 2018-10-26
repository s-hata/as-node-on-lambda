import { TodosActions, TodosAction } from './todos.actions';
import { List } from 'immutable';
import { Todo } from '@app/shared/models/todo';


export interface TodosState {
  items: List<Todo>;
}

export const INITIAL_STATE: TodosState = {
  items: List<Todo>()
};

export function todosReducer(lastState: TodosState = INITIAL_STATE, action: TodosAction): TodosState {
  let index: number;

  switch (action.type) {
    case TodosActions.LOAD_SUCCESS:
      return { items: action.payload.todos };

    case TodosActions.LOAD_FAIL:
      return INITIAL_STATE;

    case TodosActions.ADD_SUCCESS:
      return {
        items: lastState.items.push(action.payload.todo)
      };

    case TodosActions.ADD_FAIL:
      return Object.assign({}, lastState, {
        message: action.payload.message
      });

    case TodosActions.REMOVE_SUCCESS:
      index = lastState.items.findIndex(todo => todo.id === action.payload.todo.id);
      return {
        items: lastState.items.delete(index)
      };

    case TodosActions.REMOVE_FAIL:
      return Object.assign({}, lastState, {
        message: action.payload.message
      });

    case TodosActions.UPDATE_SUCCESS:
      index = lastState.items.findIndex(todo => todo.id === action.payload.todo.id);
      return {
        items: lastState.items.set(index, action.payload.todo)
      };

    case TodosActions.UPDATE_FAIL:
      return Object.assign({}, lastState, {
        message: action.payload.message
      });

    default:
      return lastState;
  }
}
