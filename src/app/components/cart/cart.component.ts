import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { slideInOut } from 'src/app/animations';
import { CartService } from 'src/app/services/cart/cart.service';
import { Cart } from 'src/app/interfaces/cart';

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
