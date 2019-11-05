import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'cowls-user-classification',
  templateUrl: './user-classification.component.html',
  styleUrls: ['./user-classification.component.css']
})
export class UserClassificationComponent implements OnInit {
  @Input() classificationId: string;

  image: string;
  classifiedUsers: any;
  classifiedUsersCount: number;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {

    this.usersService.getAllClassifiedUser(this.classificationId).subscribe(classificationUsers => {
      this.classifiedUsers = classificationUsers.classifiedUsers;
      this.classifiedUsersCount = classificationUsers.count;
    });
  }

}
