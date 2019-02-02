import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CannabisComponent } from './cannabis.component';

const routes: Routes = [
  {
    path: '',
    component: CannabisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CannabisRoutingModule { }
