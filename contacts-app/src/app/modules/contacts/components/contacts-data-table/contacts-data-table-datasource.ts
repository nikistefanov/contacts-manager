import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { IContact } from '../../../../shared/models/contact';

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ContactsDataTableDataSource extends DataSource<IContact> {
    data: IContact[] = [];
    paginator: MatPaginator | undefined;
    test$: BehaviorSubject<IContact[]>;

    constructor(data: IContact[]) {
        super();

        this.data = data;
        this.test$ = new BehaviorSubject<IContact[]>(this.data);
    }

    update() {
        this.test$.next(this.data);
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<IContact[]> {
        if (this.paginator) {
            // Combine everything that affects the rendered data into one update
            // stream for the data-table to consume.
            return merge(this.test$, this.paginator.page)
                .pipe(map(() => {
                    return this.getPagedData(this.test$.getValue());
                }));
        } else {
            throw Error('Please set the paginator on the data source before connecting.');
        }
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect(): void { }

    /**
     * Paginate the data (client-side). If you're using server-side pagination,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getPagedData(data: IContact[]): IContact[] {
        if (this.paginator) {
            const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
            return data.splice(startIndex, this.paginator.pageSize);
        } else {
            return data;
        }
    }
}
