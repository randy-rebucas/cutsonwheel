import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/services/users/users.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { Cart } from 'src/app/interfaces/cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cowls-assistants',
  templateUrl: './assistants.component.html',
  styleUrls: ['./assistants.component.css']
})
export class AssistantsComponent implements OnInit, OnDestroy {
  @Input() classificationId: string;
  @Input() isSelected: boolean;
  @Input() isFeatured: boolean;
  @Input() isToprated: boolean;

  classifiedAssistants: any;
  classifiedAssistantCount: number;

  total = 0;
  services: any;
  selectedAssistant: string;

  private servicesSub: Subscription;
  private assistantSub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private usersService: UsersService,
    private location: Location
  ) { }

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

    this.usersService.getAllClassifiedUser(this.classificationId).subscribe(classificationUsers => {
      this.classifiedAssistants = classificationUsers.classifiedUsers;
      this.classifiedAssistantCount = classificationUsers.count;
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
