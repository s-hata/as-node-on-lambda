import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { UPDATE_LOCATION } from '@angular-redux/router';


export class LocationsAction implements Action {
  public type: string;
  public payload: string;
}

@Injectable()
export class LocationsActions {
  static readonly FOWARD_TO_TODOS = UPDATE_LOCATION;

  public forwardToTodos() {
    return {
      type: LocationsActions.FOWARD_TO_TODOS,
      payload: '/todos'
    };
  }
}
