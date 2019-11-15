import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';
import { Cart } from './cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  total: number;
  services: any[];

  private servicesSub: Subscription;

  constructor(
    private cartService: CartService
  ) {
    this.total = 0;
  }

  ngOnInit() {
    this.total = this.cartService.getTotal();
    this.services = this.cartService.getCartItems();
    this.servicesSub = this.cartService.getCartObservable()
    .subscribe((cartData: {servicesList: Cart[], total: number}) => {
      this.total = cartData.total;
      this.services = cartData.servicesList;
    });
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
