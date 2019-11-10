import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/_shared/cart/cart.service';

@Component({
  selector: 'cowls-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent implements OnInit {
  public services: any;
  public total = 0;
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.services = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

}
