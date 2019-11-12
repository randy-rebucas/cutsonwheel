import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from 'src/app/public/home/home.component';
import { AboutComponent } from 'src/app/public/about/about.component';
import { ContactComponent } from 'src/app/public/contact/contact.component';
import { TeamsComponent } from 'src/app/public/teams/teams.component';
import { HowItWorksComponent } from 'src/app/public/how-it-works/how-it-works.component';
import { NotActivatedComponent } from 'src/app/public/not-activated/not-activated.component';
import { PageNotFoundComponent } from 'src/app/public/page-not-found/page-not-found.component';

import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatCardModule
} from '@angular/material';

import { MembersComponent } from 'src/app/components/members/members.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent,
    TeamsComponent,
    HowItWorksComponent,
    PageNotFoundComponent,
    NotActivatedComponent,
    MembersComponent,
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
      { path: 'not-activated', component: NotActivatedComponent },
      { path: 'not-found', component: PageNotFoundComponent },
      { path: 'how-it-works', component: HowItWorksComponent, data: { animation: 'isLeft'} },
      {
        path: 'book-now',
        loadChildren: './../../modules/public/book-now/book-now.module#BookNowModule'
      }
    ])
  ]
})
export class PublicModule { }
