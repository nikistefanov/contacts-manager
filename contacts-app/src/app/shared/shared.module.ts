import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from '../modules/material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CheckPasswordDirective } from './directives/check-password.directive';

const COMPONENTS = [
    CardComponent,
    NavbarComponent
]

const DIRECTIVES = [
    CheckPasswordDirective
]

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [...COMPONENTS, ...DIRECTIVES]
})
export class SharedModule { }
