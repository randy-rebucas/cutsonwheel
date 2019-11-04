import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'cowls-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Statistics', cols: 1, rows: 1 },
          { title: 'Bookings', cols: 1, rows: 1 },
          { title: 'Transactions', cols: 1, rows: 1 },
          { title: 'Clients', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Statistics', cols: 2, rows: 1 },
        { title: 'Bookings', cols: 1, rows: 1 },
        { title: 'Transactions', cols: 1, rows: 2 },
        { title: 'Clients', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
