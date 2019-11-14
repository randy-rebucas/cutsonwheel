import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('de'); // default language
    this.translate.use('en'); // override language
   }

  ngOnInit() {
  }

}
