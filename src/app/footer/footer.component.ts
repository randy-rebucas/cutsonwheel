import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() appName: string;
  @Input() appVersion: string;

  public version: string;
  public application: string;

  constructor() { }

  ngOnInit() {
    console.log(this.appName);
    this.version = this.appVersion;
    this.application = this.appName;
  }

}
