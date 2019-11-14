import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { ClassificationService } from '../classification/classification.service';
import { Classification } from '../classification/classification';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  total: number;
  classifications: any[];
  isLoading: boolean;

  private perPage: number;
  private currentPage: number;
  private userIsAuthenticated: boolean;
  private classificationSub: Subscription;



  constructor(
    private translate: TranslateService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private classificationService: ClassificationService
  ) {
    translate.setDefaultLang('de'); // default language
    this.translate.use('en'); // override language
    this.total = 0;
    this.perPage = 10;
    this.currentPage = 1;
   }

  ngOnInit() {
    this.userIsAuthenticated = this.authenticationService.getIsAuth();
    if (this.userIsAuthenticated) {
      this.router.navigate(['/dashboard']);
    }

    this.classificationService.getAll(this.perPage, this.currentPage);
    this.classificationSub = this.classificationService.getUpdateListener()
    .subscribe((classificationData: {classifications: Classification[], counts: number}) => {
      this.isLoading = false;
      this.total = classificationData.counts;
      this.classifications = classificationData.classifications;
    });
  }

  onDetail(classificationId: string) {
    this.router.navigate(['/classification/' + classificationId]);
  }

  ngOnDestroy() {
    this.classificationSub.unsubscribe();
  }

}
