import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { MaterialModule } from '../material/material.module';
import { ContactCreateComponent } from './components/contact-create/contact-create.component';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
    ContactsComponent,
    ContactDetailComponent
]

@NgModule({
  declarations: [...COMPONENTS, ContactCreateComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports: [...COMPONENTS]
})
export class ContactsModule { }
