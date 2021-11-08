import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
    { path: 'contacts', component: ListComponent },
    { path: 'contacts/:id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
