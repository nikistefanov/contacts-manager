import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { ContactsRoutingModule } from './modules/contacts/contacts-routing.module';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { RoutePaths } from './shared/constants/route-paths';

const routes: Routes = [
    { path: "", redirectTo: RoutePaths.Login, pathMatch: "full" },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), ContactsRoutingModule, AuthRoutingModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }
