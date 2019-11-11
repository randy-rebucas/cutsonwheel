import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';

export interface Service {
  type: string;
  duration: string;
  price: string;
}
@Component({
  selector: 'cowls-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnDestroy {
  total = 0;
  services: any;

  private servicesSub: Subscription;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.servicesSub = this.cartService.getCartUpdated()
    .subscribe((cartData: {servicesList: Service[], total: number}) => {
      this.total = cartData.total;
      this.services = cartData.servicesList;
    });
  }

  ngOnDestroy() {
    this.servicesSub.unsubscribe();
  }
}
