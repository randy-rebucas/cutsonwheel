import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CartService } from '../../cart/cart.service';
import { UserService } from '../../user/user.service';
import { Subscription } from 'rxjs';
import { Cart } from '../../cart/cart';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss']
})
export class AssistantComponent implements OnInit, OnDestroy {

  classifiedAssistants: any;
  classifiedAssistantCount: number;

  total: number;
  perPage: number;
  currentPage: number;
  services: any[];
  selectedAssistant: string;

  private servicesSub: Subscription;
  private assistantSub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService,
    private location: Location
  ) {
    this.total = 0;
    this.perPage = 10;
    this.currentPage = 1;
  }

  ngOnInit() {

    this.services = this.cartService.getCartItems();
    this.servicesSub = this.cartService.getCartObservable()
    .subscribe((cartData: {servicesList: Cart[], total: number}) => {
      this.total = cartData.total;
      this.services = cartData.servicesList;

      // return to service page if all items are removed
      if (this.services.length === 0) {
        this.location.back();
      }
    });

    this.userService.getAll(this.perPage, this.currentPage);
    this.userService.getUpdateListener().subscribe(classificationUsers => {
      this.classifiedAssistants = classificationUsers.users;
      this.classifiedAssistantCount = classificationUsers.counts;
    });

    // get selected assistant
    // this.cartService.getAssistantSub();
    this.selectedAssistant = this.cartService.getAssistant();
    this.assistantSub = this.cartService.getAssistantObservable().subscribe(
      (assistant) => {
        this.selectedAssistant = assistant.assistant;
      }
    );
  }

  onRemoveItem(cartItem) {
    this.cartService.removeCart(cartItem);
  }

  onSelect(assistandtId: string) {
    this.cartService.setAssistant(assistandtId);
    // this.router.navigate(['../step-two'], {relativeTo: this.activatedRoute});
  }

  ngOnDestroy() {
    this.servicesSub.unsubscribe();
    this.assistantSub.unsubscribe();
  }
}
