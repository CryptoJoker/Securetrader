import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CryptoboomComponent } from './cryptoboom.component';

const routes: Routes = [
  {
    path: '',
    component: CryptoboomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptoboomRoutingModule { }
