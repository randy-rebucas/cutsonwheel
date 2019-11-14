import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatChipsModule } from '@angular/material';
import { HomeComponent } from './home.component';
import { HttpLoaderFactory } from 'src/app/app.module';
import { AssistantComponent } from 'src/app/shared/components/assistant/assistant.component';

@NgModule({
  declarations: [
    HomeComponent,
    AssistantComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    HttpClientModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    RouterModule.forChild([
      { path: '', component: HomeComponent },
    ])
  ]
})
export class HomeModule {}
