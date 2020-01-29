import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { UserService } from '../../user/user.service';
import { ClassificationService } from '../../classification/classification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Address } from '../../user/user';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  public services: any[];
  public schedule: any;
  public servicesCount: number;
  public total: number;

  public avatar: string;
  public fullname: string;
  public classification: string;
  public theAge: number;
  public theDate: string;
  public theHour: any;
  public theMin: any;
  public theTimezone: string;

  public rate: number;

  public userAddress: Address;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private classificationService: ClassificationService
  ) {
    this.servicesCount = 0;
    this.total = 0;
  }

  ngOnInit() {
    // get services
    this.services = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
    this.servicesCount = this.services.length;
    // get assistant
    this.userService.get(this.cartService.getAssistant()).subscribe((res) => {
      this.classificationService.getOne(res.classification).subscribe((classificationName) => {
        this.classification = classificationName.name.slice(0, -1);
      });
      this.avatar = res.photoUrl;
      this.fullname = res.name.firstname + ' ' + res.name.lastname;
      const today = new Date();
      const birthdateDate = new Date(res.birthdate);
      let age = today.getFullYear() - birthdateDate.getFullYear();
      const m = today.getMonth() - birthdateDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthdateDate.getDate())) {
        age--;
      }
      this.theAge = age;
    });

    // get schedules
    this.schedule = this.cartService.getSchedule();
    const pureDate = new Date(this.schedule.date);
    const transformedDate = pureDate.getFullYear() + '-' + (pureDate.getMonth() + 1) + '-' + pureDate.getDate();
    const transformedTime = this.pad(this.schedule.hour) + ':' + this.pad(this.schedule.minute) + ':00';
    const finalMutation = new Date(transformedDate + 'T' + transformedTime);

    this.theDate = finalMutation.toDateString();
    this.theTimezone = finalMutation.toLocaleString('en-PH', { hour: 'numeric', minute: 'numeric', hour12: true });

    // ratings
    this.rate = 3.14;

    // get user information
    this.userService.get(this.authenticationService.getUserId()).subscribe((user) => {
      console.log(user.address);
      this.userAddress.address1 = user.address.address1;
      this.userAddress.address2 = user.address.address2;
      this.userAddress.province = user.address.province;
      this.userAddress.city = user.address.city;
      this.userAddress.country = user.address.country;
      this.userAddress.postalCode = user.address.postalCode;
    });
  }

  pad(n: number) {
    if (n < 10) {
      return '0' + n;
    }
    return n;
  }

  onConfirmed() {
    // submit to booking
    this.router.navigate(['../step-five'], {relativeTo: this.activatedRoute});
  }
}
