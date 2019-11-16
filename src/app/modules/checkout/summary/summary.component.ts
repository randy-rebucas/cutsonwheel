import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { UserService } from '../../user/user.service';
import { ClassificationService } from '../../classification/classification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';

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
  public theDate: Date;
  public theHour: any;
  public theMin: any;
  public theTimezone: string;

  public rate: number;

  public userAddresses: any[];
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
      this.avatar = res.avatar;
      this.fullname = res.firstname + ' ' + res.lastname;
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
    const transformedDate = pureDate.getUTCFullYear() + '-' + pureDate.getUTCMonth() + '-' + pureDate.getUTCDate();
    const transformedTime = this.pad(this.schedule.hour) + ':' + this.pad(this.schedule.minute) + ':00.000Z';
    const finalMutation = new Date(transformedDate + 'T' + transformedTime);

    this.theDate = finalMutation;
    // this.theHour = this.pad(finalMutation.getHours());
    // this.theMin = this.pad(finalMutation.getMinutes());
    this.theTimezone = finalMutation.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    // ratings
    this.rate = 3.14;

    // get user information
    this.userService.get(this.authenticationService.getUserId()).subscribe((user) => {
      console.log(user.address);
      this.userAddresses = user.address;
    });
  }

  pad(n: number) {
    if (n < 10) {
      return '0' + n;
    }
    return n;
  }

  onNext() {
    this.router.navigate(['../step-five'], {relativeTo: this.activatedRoute});
  }
}
