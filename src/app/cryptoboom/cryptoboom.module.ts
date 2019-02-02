import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoboomComponent } from './cryptoboom.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CryptoboomRoutingModule } from './cryptoboom-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CryptoboomRoutingModule
  ],
  declarations: [CryptoboomComponent]
})
export class CryptoboomModule { }
