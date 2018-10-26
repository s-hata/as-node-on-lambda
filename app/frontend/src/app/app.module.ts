import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInitializer } from '@app/app.initializer';
import { CoreModule } from '@app/core/module';
import { SharedModule } from '@app/shared/module';


export function initializerFactory(appInitializer: AppInitializer) {
  return () => appInitializer.loadSettings();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    AppInitializer,
    { provide: APP_INITIALIZER, useFactory: initializerFactory, deps: [ AppInitializer ], multi: true  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
