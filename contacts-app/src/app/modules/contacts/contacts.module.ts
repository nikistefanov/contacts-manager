import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { MaterialModule } from '../material/material.module';
import { ContactCreateComponent } from './components/contact-create/contact-create.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

const COMPONENTS = [
    ContactsComponent,
    ContactCreateComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule
  ]
})
export class ContactsModule { }
