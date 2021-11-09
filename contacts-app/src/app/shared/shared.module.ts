import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from '../modules/material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
    CardComponent,
    NavbarComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [...COMPONENTS]
})
export class SharedModule { }
