import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CannabisComponent } from './cannabis.component';
import { CannabisRoutingModule } from './cannabis-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CannabisRoutingModule,
    FormsModule,
    HttpClientModule, ReactiveFormsModule
  ],
  declarations: [CannabisComponent]
})
export class CannabisModule { }
