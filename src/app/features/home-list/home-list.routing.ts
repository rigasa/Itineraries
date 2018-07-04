import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeListComponent } from './containers/home-list/home-list.component';

const routes: Routes = [
  {
    path: '',
    outlet: 'list',
    component: HomeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeListRoutingModule { }
