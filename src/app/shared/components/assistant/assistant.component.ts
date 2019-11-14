import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/modules/user/user.service';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss']
})
export class AssistantComponent implements OnInit {
  @Input() classificationId: string;

  image: string;
  classifiedUsers: any;
  classifiedUsersCount: number;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getAllClassifiedUser(this.classificationId).subscribe(classificationUsers => {
      this.classifiedUsers = classificationUsers.classifiedUsers;
      this.classifiedUsersCount = classificationUsers.count;
    });
  }

}
