import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';


@Component({
  selector: 'cowls-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

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
