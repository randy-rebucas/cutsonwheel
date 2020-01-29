import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { UserService } from '../../user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Address } from '../../user/user';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public userIsAuthenticated = false;
  private userId: string;
  public avatar: string;
  public fullname: string;
  public dob: Date;
  public address: Address;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();
    this.userService.get(this.userId).subscribe((res) => {
      this.avatar = res.photoUrl;
      this.fullname = res.name.firstname + ' ' + res.name.lastname;
      this.dob = new Date(res.birthdate);
      this.address.address1 = res.address.address1;
      this.address.address2 = res.address.address2;
      this.address.province = res.address.province;
      this.address.city = res.address.city;
      this.address.country = res.address.country;
      this.address.postalCode = res.address.postalCode;
    });
  }

  onNext() {
    this.router.navigate(['../step-four'], {relativeTo: this.activatedRoute});
  }
}
