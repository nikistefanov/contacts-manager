import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';

const COMPONENTS = [
    ListComponent,
    DetailsComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ContactsRoutingModule
  ],
  exports: [...COMPONENTS]
})
export class ContactsModule { }
