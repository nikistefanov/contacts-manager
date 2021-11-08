import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const COMPONENTS = [
    RegisterComponent,
    LoginComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [...COMPONENTS]
})
export class AuthModule { }
