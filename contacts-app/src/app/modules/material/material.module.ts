import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";

const MATERIAL_MODULES = [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule
];

@NgModule({
    imports: [
        ...MATERIAL_MODULES
    ],
    exports: [
        ...MATERIAL_MODULES
    ]
})
export class MaterialModule { }
