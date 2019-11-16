import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { ClassificationService } from '../classification/classification.service';
import { Subscription } from 'rxjs';
import { Cart } from '../cart/cart';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy, AfterViewInit {

  public isLoading: boolean;
  public isSelected: boolean;
  public checked: boolean;
  public classificationId: string;
  public classificationName: string;
  public classificationDescription: string;
  public classificationImage: string | File;
  public classificationServices: any;

  total: number;
  formControlObj: FormControl;
  selectedServiceItem: any[];
  allColumns: any[];

  private servicesSub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private classificationService: ClassificationService,
    private location: Location
  ) {
    this.total = 0;
   }

  ngOnInit() {

    this.total = this.cartService.getTotal();
    this.selectedServiceItem = this.cartService.getCartItems();
    this.servicesSub = this.cartService.getCartObservable()
    .subscribe((cartData: {servicesList: Cart[], total: number}) => {
      this.total = cartData.total;
      this.selectedServiceItem = cartData.servicesList;
    });

    this.formControlObj = new FormControl(this.selectedServiceItem);

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.classificationId = paramMap.get('classificationId');
      this.isLoading = true;
      this.classificationService.getOne(this.classificationId).subscribe(classificationData => {
        this.isLoading = false;
        this.classificationName = classificationData.name;
        this.classificationDescription = classificationData.description;
        this.classificationImage = classificationData.image;
        this.classificationServices = classificationData.services;
      });
    });
  }

  ngAfterViewInit() {

    this.formControlObj.setValue(this.selectedServiceItem);
  }

  onSelection(event, value) {
    if (event.option.selected) {
      this.cartService.addCart(event.option.value);
    } else {
      this.cartService.removeCart(event.option.value);
    }
  }

  onCheckout() {
    this.router.navigate(['/checkout']);
  }

  onContinue() {
    this.location.back();
  }

  compare(c1: {_id: string}, c2: {_id: string}) {
    return c1 && c2 && c1._id === c2._id;
  }

  ngOnDestroy() {
    this.servicesSub.unsubscribe();
  }
}
