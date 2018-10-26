import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'todos',
    loadChildren: '@app/feature/todos/module#TodosModule'
  },
  {
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/todos'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
