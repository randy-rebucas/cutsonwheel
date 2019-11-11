import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClassificationService } from 'src/app/private/classification/classification.service';
import { CartService } from 'src/app/_shared/cart/cart.service';
import { Subscription } from 'rxjs';
import { MatCheckbox } from '@angular/material';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
export interface Service {
  type: string;
  duration: string;
  price: string;
}
@Component({
  selector: 'cowls-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
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
  // services: any;

  private servicesSub: Subscription;

  formControlObj: FormControl;
  selectedServiceItem: any[];
  allColumns: any[];
  // currentSelected: string;

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

    this.selectedServiceItem = this.cartService.getCartItems();
    console.log(this.selectedServiceItem);
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

        this.formControlObj.setValue(this.selectedServiceItem);
      });
    });
  }

  onSelection(e, v){
    if (e.option.selected) {
      this.cartService.addCart(e.option.value);
    } else {
      this.cartService.removeCart(e.option.value);
    }
  }

  addToCart(checkbox: MatCheckbox, service: any) {
    if (!checkbox.checked) {
      this.cartService.addCart(service);
    } else {
      this.cartService.removeCart(service);
    }
    this.isChecked(service._id);
  }

  isChecked(serviceId: string) {
    this.isSelected = false;
    const services = this.cartService.getCartItems();
    if (services) {
      services.forEach(element => {
        if (element._id === serviceId) {
          this.isSelected = true;
        }
      });
    }
    return this.isSelected;
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
}
