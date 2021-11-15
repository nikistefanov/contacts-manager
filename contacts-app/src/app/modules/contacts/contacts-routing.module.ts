import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ContactsComponent } from './components/contacts/contacts.component';

export const contactsRoutes: Routes = [
    { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(contactsRoutes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
