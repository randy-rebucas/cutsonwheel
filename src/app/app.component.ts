import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigurationService } from './configs/app-configuration.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myRecord';

  /**
   * Application configurations
   */
  public appName: string;
  public appVersion: string;
  public lang: string;

  constructor(
    private translate: TranslateService,
    private appConfigurationService: AppConfigurationService
  ) {

    translate.setDefaultLang('de'); // default language
    this.translate.use('en'); // override language
  }

  async loadConfig() {
    const appConfigurationService = await this.appConfigurationService.ensureInit();
    return {
      config: appConfigurationService
    };
  }

  async ngOnInit() {
    // load language setting
    await this.loadConfig().then((config) => {
      this.appVersion  = config.config.appVersion;
      this.appName = config.config.appName;
      this.lang = config.config.language;
    });
  }



}
