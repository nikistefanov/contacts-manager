import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ContactsDataTableComponent } from './components/contacts-data-table/contacts-data-table.component';
import { ContactsComponent } from './components/contacts/contacts.component';

const routes: Routes = [
    { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
    { path: 'contacts-data-table', component: ContactsDataTableComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
