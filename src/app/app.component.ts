import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myRecord';
  constructor(private translate: TranslateService) {
    // load language setting
    translate.setDefaultLang('de'); // default language
    this.translate.use('en'); // override language
  }
}
