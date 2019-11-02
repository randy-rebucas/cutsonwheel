import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cowls-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  public path: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    this.path = this.router.parseUrl(this.router.url).root.children.primary.segments.pop().path;

  }

}
