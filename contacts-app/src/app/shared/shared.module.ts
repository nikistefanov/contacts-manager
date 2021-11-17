import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from '../modules/material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { ConfirmComponent } from './components/dialog/confirm/confirm.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const COMPONENTS = [
    CardComponent,
    NavbarComponent,
    LoaderComponent,
    ConfirmComponent,
    NotFoundComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  providers: [],
  exports: [...COMPONENTS]
})
export class SharedModule { }
