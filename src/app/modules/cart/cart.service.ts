import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
import { Cart } from './cart';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartObservable = new Subject<{ servicesList: Cart[], total: number }>();
  private assistantUpdated = new Subject<{ assistant: string }>();

  services: any;

  constructor() {}

  addCart(service: {}) {
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
    this.cartObservable.next({
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
    this.setCartObservable();
  }

  getCartItems() {
    // get all cart items
    return JSON.parse(sessionStorage.getItem('services'));
  }

  setCartObservable() {
    // get all cart items
    const servicesItems = this.getCartItems() ? this.getCartItems() : [];

    // update observables
    this.cartObservable.next({
      servicesList: [...servicesItems],
      total: this.getTotal()
    });
  }

  getCartObservable() {
    // observe changes in session storage
    return this.cartObservable.asObservable();
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

  /**
   * Insures that cart is supported to initiate assistant
   */
  setAssistant(assistantId: string) {
    // set assistant
    sessionStorage.setItem('assistant', assistantId);

    this.setObservableAssistant();
  }

  getAssistant() {
    // get all cart items
    return sessionStorage.getItem('assistant');
  }

  getAssistantSub() {
    // get all cart items
    of(this.getAssistant())
    .pipe(
      map(assistantData => {
        return assistantData;
      })
    )
    .subscribe((selectedAssistant) => {
      this.assistantUpdated.next({assistant: selectedAssistant});
    });
  }

  setObservableAssistant() {
    const selectedAssistant = this.getAssistant();
    // update observables
    this.assistantUpdated.next({assistant: selectedAssistant});
  }

  getAssistantObservable() {
    // observe changes in session storage
    return this.assistantUpdated.asObservable();
  }

  removeAssistant() {
    // remove assistant
    return sessionStorage.removeItem('assistant');
  }

  /**
   * set schedule date
   */
  setSchedule(schedule: {}) {
    // set schedule
    sessionStorage.setItem('schedule', JSON.stringify(schedule));

    this.setObservableAssistant();
  }

  getSchedule() {
    // get schedule
    return JSON.parse(sessionStorage.getItem('schedule'));
  }
}
