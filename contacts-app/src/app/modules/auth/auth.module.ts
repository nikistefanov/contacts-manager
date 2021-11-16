import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from './auth.service';
import { StorageService } from '../../shared/services/storage/storage.service';

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
    HttpClientModule,
    MaterialModule,
    SharedModule
  ],
  exports: [...COMPONENTS],
  providers: [
      AuthService
  ]
})
export class AuthModule { }
