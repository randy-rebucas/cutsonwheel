import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from './cart.service';
import { slideInOut } from 'src/app/animations';

export interface Service {
  type: string;
  duration: string;
  price: string;
}

@Component({
  selector: 'cowls-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    slideInOut
  ]
})
export class CartComponent implements OnInit, OnDestroy {

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

    this.cartService.getCartItem();
  }

  onCartClear() {
    this.cartService.clearCart();
  }

  onDeleteItem(service: any) {
    this.cartService.removeCart(service);
  }

  ngOnDestroy() {
    this.servicesSub.unsubscribe();
  }
}
