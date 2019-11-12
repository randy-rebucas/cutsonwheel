import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClassificationService } from 'src/app/private/classification/classification.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { Cart } from 'src/app/interfaces/cart';

@Component({
  selector: 'cowls-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, OnDestroy {
  public isLoading: boolean;
  public isSelected: boolean;
  public checked: boolean;
  public classificationId: string;
  public classificationName: string;
  public classificationDescription: string;
  public classificationImage: string | File;
  public classificationServices: any;
  displayedColumns: string[] = ['type', 'duration', 'price'];

  total = 0;

  private servicesSub: Subscription;

  formControlObj: FormControl;
  selectedServiceItem: any[];
  allColumns: any[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private classificationService: ClassificationService,
    private location: Location
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param) => {
        this.classificationId = param.classificationId;
      }
    );
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
        setTimeout(() => this.formControlObj.setValue(this.selectedServiceItem), 1000);
      });
    });
  }

  onSelection(event, value) {
    if (event.option.selected) {
      this.cartService.addCart(event.option.value);
    } else {
      this.cartService.removeCart(event.option.value);
    }
  }

  onCheckout() {
    this.router.navigate(['./checkout'], {relativeTo: this.activatedRoute});
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
