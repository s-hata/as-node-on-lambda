import { Injectable } from '@angular/core';
import { Action } from 'redux';


export class UiAction implements Action {
  public type: string;
  public payload?: string;
}

@Injectable()
export class UiActions {
  static readonly SHOW_MESSAGE = 'SHOW_MESSAGE';
  static readonly CLEAN_MESSAGE = 'CLEAN_MESSAGE';

  public showMessage(message: string): UiAction {
    return {
      type: UiActions.SHOW_MESSAGE,
      payload: message
    };
  }

  public cleanMessage(): UiAction {
    return {
      type: UiActions.CLEAN_MESSAGE,
    };
  }
}
