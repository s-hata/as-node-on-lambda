import { UiActions, UiAction } from './ui.actions';


export interface UiState {
  processing: boolean;
  message?: string;
}

export const INITIAL_STATE: UiState = {
  processing: false
};

export function uiReducer(lastState: UiState = INITIAL_STATE, action: UiAction): UiState {

  switch (action.type) {
    case UiActions.SHOW_MESSAGE:
      return {
        processing: false,
        message: action.payload
      };
    case UiActions.CLEAN_MESSAGE:
      return {
        processing: false,
        message: null
      };
    default:
      return lastState;
  }
}
