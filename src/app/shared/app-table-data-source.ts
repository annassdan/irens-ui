import {DataSource} from '@angular/cdk/table';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of, of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';
import {delegateLevelValue} from './utils';


export class AppTableDataSource extends DataSource<any> {

  public data: any = [];
  properties: any;
  defaultPageSize = 10;

  constructor(data: any[], properties: any, public paginator?: MatPaginator, public sort?: MatSort) {
    super();
    this.data = data;
    this.properties = properties;
  }

  connect(): Observable<any[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.

    const dataMutations = [
      observableOf(this.data),
      this.paginator ? this.paginator.page : 0,
      this.sort ? this.sort.sortChange : undefined
    ];

    // Set the paginator's length
    // this.paginator.length = this.data.length;

    if (this.sort) {
      return merge(...dataMutations).pipe(map(() => {
        // return this.getPagedData(this.getSortedData([...this.data]));  gunakan ini jika datanya diload semua diawal
        return this.sort ? this.getSortedData([...this.data]) : this.data;
      }));
    } else {
      return of([...this.data]);
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }


  private getPagedData(data: any[]) {
    const startIndex = (this.paginator ? this.paginator.pageIndex : 0) * (this.paginator ? this.paginator.pageSize : this.defaultPageSize);
    return data.splice(startIndex, (this.paginator ? this.paginator.pageSize : this.defaultPageSize));
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: any[]) {
    if (this.sort === undefined || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    // const isStringDataTypes = this.properties.

    return data.sort((a: any, b: any) => {

      // case 'uuid': return compare(+a.uuid, +b.uuid, isAsc); pake + jika angka

      const isAsc = this.sort.direction === 'asc';

      let i = 0;
      for (const ident of this.properties.displayedColumns) {
        if (this.sort.active === ident ) {

          if (this.properties.isStringDataTypes) {
            try {
              return (this.properties.isStringDataTypes[i])
                ? compare(delegateLevelValue(a, this.properties.levelsOnData[i]),
                  delegateLevelValue(b, this.properties.levelsOnData[i]), isAsc)
                : compare(+delegateLevelValue(a, this.properties.levelsOnData[i]),
                  +delegateLevelValue(b, this.properties.levelsOnData[i]), isAsc);
            } catch (e) {
              return compare(
                String(delegateLevelValue(a, this.properties.levelsOnData[i])),
                String(delegateLevelValue(b, this.properties.levelsOnData[i])),
                isAsc);
            }
          } else {
            return compare(
              String(delegateLevelValue(a, this.properties.levelsOnData[i])),
              String(delegateLevelValue(b, this.properties.levelsOnData[i])),
              isAsc);
          }
        }

        i++;
      }

      return 0;
    });
  }

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
