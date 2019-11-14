import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeamComponent } from './team.component';


@NgModule({
  declarations: [
    TeamComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: TeamComponent },
    ])
  ]
})
export class TeamModule {}
