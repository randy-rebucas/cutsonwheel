import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('de'); // default language
    this.translate.use('en'); // override language
   }

  ngOnInit() {
  }

}
