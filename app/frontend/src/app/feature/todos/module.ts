import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/module';
import { TodosRoutingModule } from './routing.module';
import { TodosContainer } from './container';
import { TodosFormComponent } from './todos-form/component';
import { TodosListComponent } from './todos-list/component';
import { TodosListItemComponent } from './todos-list-item/component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TodosRoutingModule
  ],
  declarations: [
    TodosContainer,
    TodosFormComponent,
    TodosListComponent,
    TodosListItemComponent
  ]
})
export class TodosModule { }
