import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { FooterComponent } from './components/footer/component';
import { HeaderComponent } from './components/header/component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonsModule,
    FontAwesomeModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    ReactiveFormsModule,
    ButtonsModule,
    FontAwesomeModule,
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
