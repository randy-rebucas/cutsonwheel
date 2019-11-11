import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'cowls-assistants',
  templateUrl: './assistants.component.html',
  styleUrls: ['./assistants.component.css']
})
export class AssistantsComponent implements OnInit {
  @Input() classificationId: string;
  @Input() isFeatured: boolean;
  @Input() isToprated: boolean;

  classifiedAssistant: any;
  classifiedAssistantCount: number;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.getAllClassifiedUser(this.classificationId).subscribe(classificationUsers => {
      this.classifiedAssistant = classificationUsers.classifiedUsers;
      this.classifiedAssistantCount = classificationUsers.count;
    });
  }

}
