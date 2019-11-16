import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { UserService } from '../../user/user.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  public dob: string;
  public addresses: any[];

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
      this.avatar = res.avatar;
      this.fullname = res.firstname + ' ' + res.lastname;
      this.dob = res.birthdate;
      this.addresses = res.address;
    });
  }

  onNext() {
    this.router.navigate(['../step-four'], {relativeTo: this.activatedRoute});
  }
}
