import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'cowls-steps-two',
  templateUrl: './steps-two.component.html',
  styleUrls: ['./steps-two.component.css']
})
export class StepsTwoComponent implements OnInit {
  selectedAssistant: string;
  firstname: string;
  midlename: string;
  lastname: string;
  age: number;
  gender: string;
  created: Date;
  avatar: string;

  constructor(
    private cartService: CartService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.selectedAssistant = this.cartService.getAssistant();
    this.usersService.get(this.selectedAssistant).subscribe(userData => {
      this.firstname = userData.firstname;
      this.midlename = userData.midlename;
      this.lastname = userData.lastname;
      this.gender = userData.gender;
      this.created = userData.createdAt;
      this.avatar = userData.avatar;
      const today = new Date();
      const bDate = new Date(userData.birthdate);
      let age = today.getFullYear() - bDate.getFullYear();
      const m = today.getMonth() - bDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < bDate.getDate())) {
        age--;
      }
      this.age = age;
    });
  }

}
