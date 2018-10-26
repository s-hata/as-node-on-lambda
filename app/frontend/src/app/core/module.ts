import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { applyMiddleware, Store, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';

import { environment } from '@env/environment';
import { rootReducer, AppState } from './reducers';
import { RootEpic } from './epics';
import { LocationsActions } from './locations.actions';
import { TodosActions } from './todos.actions';
import { UiActions } from './ui.actions';
import { TodosEpics } from './todos.epics';
import { TodosService } from './todos.service';


@NgModule({
  imports: [
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
  ],
  providers: [
    RootEpic,
    LocationsActions,
    TodosActions,
    UiActions,
    TodosEpics,
    TodosService
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
      ]
    };
  }

  constructor(
    @Optional() @SkipSelf() coreModule: CoreModule,
    private ngRedux: NgRedux<AppState>,
    private ngReduxRouter: NgReduxRouter,
    private devTools: DevToolsExtension,
    private rootEpic: RootEpic
  ) {
    if (coreModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }

    const epicMiddleware = createEpicMiddleware();
    let middlewares;
    if (devTools.isEnabled() && !environment.production) {
      middlewares = composeWithDevTools(applyMiddleware(epicMiddleware, createLogger()));
    } else {
      middlewares = applyMiddleware(epicMiddleware);
    }
    const store: Store<AppState> = createStore(
      rootReducer,
      middlewares
    );
    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }
    ngRedux.provideStore(store);
    epicMiddleware.run(this.rootEpic.epics);
  }
}
