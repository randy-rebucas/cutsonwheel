import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeamComponent } from './team.component';
import { MatCardModule } from '@angular/material';


@NgModule({
  declarations: [
    TeamComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild([
      { path: '', component: TeamComponent },
    ])
  ]
})
export class TeamModule {}
