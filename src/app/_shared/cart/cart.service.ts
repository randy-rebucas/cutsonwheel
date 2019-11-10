import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export interface Service {
  type: string;
  duration: string;
  price: string;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartUpdated = new Subject<{ servicesList: Service[], total: number }>();

  services: any;
  items = [];

  constructor() {}

  addCart(service) {
    // get initial cart items
    this.services = this.getCartItems() ? this.getCartItems() : [];
    // push new item
    this.services.push(service);
    // set new cart items
    this.setCartItem(this.services);
  }

  removeCart(service: {_id: string}) {
    // get all cart items
    let servicesItems = this.getCartItems() ? this.getCartItems() : [];
    // filter cart items to remove
    servicesItems = servicesItems.filter(items => items._id !== service._id);
    // update observables
    this.cartUpdated.next({
      servicesList: [...servicesItems],
      total: this.getTotal()
    });
    // set cart item again
    this.setCartItem([...servicesItems]);
  }

  setCartItem(service: any) {
    // set cart items
    sessionStorage.setItem('services', JSON.stringify(service));
    // set cart items
    this.getCartItem();
  }

  getCartItem() {
    // get all cart items
    const servicesItems = this.getCartItems() ? this.getCartItems() : [];

    // update observables
    this.cartUpdated.next({
      servicesList: [...servicesItems],
      total: this.getTotal()
    });
  }

  getCartItems() {
    // get all cart items
    return JSON.parse(sessionStorage.getItem('services'));
  }

  getCartUpdated() {
    // observe changes in session storage
    return this.cartUpdated.asObservable();
  }

  getTotal() {
    // set default total 0
    let subTotal = 0;
    // get all items in session storage
    const servicesItems = this.getCartItems();
    // check if sesison service exist
    if (servicesItems) {
      // iterate all items
      servicesItems.forEach(element => {
        // total
        subTotal += parseFloat(element.price);

      });

    }

    return subTotal;
  }

  clearCart() {
    // clear cart items
    this.setCartItem([]);
    return sessionStorage.removeItem('services');

  }

}
