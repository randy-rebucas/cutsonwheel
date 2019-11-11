import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserClassificationComponent } from 'src/app/_shared/user-classification/user-classification.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TeamsComponent } from './teams/teams.component';
import { ContactComponent } from './contact/contact.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatCardModule
} from '@angular/material';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent,
    TeamsComponent,
    HowItWorksComponent,
    UserClassificationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent, data: { animation: 'isRight'} },
      { path: 'teams', component: TeamsComponent, data: { animation: 'isRight'} },
      { path: 'contact', component: ContactComponent },
      { path: 'how-it-works', component: HowItWorksComponent, data: { animation: 'isLeft'} },
      {
        path: 'book-now',
        loadChildren: './book-now/book-now.module#BookNowModule'
      }
    ])
  ]
})
export class PublicModule {}
