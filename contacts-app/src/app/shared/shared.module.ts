import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from '../modules/material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CheckPasswordDirective } from './directives/check-password.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { ConfirmDeleteComponent } from './components/dialog/confirm-delete/confirm-delete.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const COMPONENTS = [
    CardComponent,
    NavbarComponent,
    LoaderComponent,
    ConfirmDeleteComponent,
    NotFoundComponent
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
