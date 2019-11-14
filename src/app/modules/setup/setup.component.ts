import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('de'); // default language
    this.translate.use('en'); // override language
  }

  ngOnInit() {

  }

}
