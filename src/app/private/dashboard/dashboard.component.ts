import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'cowls-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.navigate(['/setup/' + localStorage.getItem('userId')]);
    // if (userData.activated) {
    //   this.router.navigate(['/dashboard']);
    // } else {
    //   this.router.navigate(['/not-activated']);
    //   // this.router.navigate(['/setup/' + response.userId]);
    // }
  }
}
