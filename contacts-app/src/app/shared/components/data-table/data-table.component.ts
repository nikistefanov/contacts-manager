import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { IContact } from '../../models/contact';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html'
})
export class DataTableComponent implements OnInit, AfterViewInit {
    @Input() displayedColumns: string[] = [];
    @Input() displayedHeaders: string[] = [];
    @Input() data: any[] = [];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<DataTableItem>;
    @Output() onDelete = new EventEmitter<any>();
    dataSource!: DataTableDataSource;

    ngOnInit() {
        this.dataSource = new DataTableDataSource(this.data);
        this.displayedColumns.push("actions");
        this.displayedHeaders.push("Action")
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }

    handleDelete(data: any) {
        this.onDelete.emit(data);
    }
}
