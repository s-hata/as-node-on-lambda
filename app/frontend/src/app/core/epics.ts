import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable';
import { TodosEpics } from './todos.epics';


@Injectable()
export class RootEpic {
  public epics;

  constructor(
    private todosEpics: TodosEpics
  ) {
    this.epics = combineEpics(
      todosEpics.load,
      todosEpics.loadFail,
      todosEpics.add,
      todosEpics.addFail,
      todosEpics.update,
      todosEpics.updateFail,
      todosEpics.remove,
      todosEpics.removeFail
    );
  }
}
