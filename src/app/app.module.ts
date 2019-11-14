import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { TopNavComponent } from './modules/top-nav/top-nav.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './modules/error/error.component';
import { PromptDialogComponent } from './modules/prompt-dialog/prompt-dialog.component';
import { AuthenticationInterceptor } from './modules/authentication/authentication-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';

import {
  MatSnackBarModule,
  MatInputModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDialogModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { NotActivatedComponent } from './modules/not-activated/not-activated.component';
import { AppConfigurationService } from './configs/app-configuration.service';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule, TranslateCompiler} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// import ngx-translate-messageformat-compiler
import {TranslateMessageFormatCompiler} from 'ngx-translate-messageformat-compiler';
import { MESSAGE_FORMAT_CONFIG } from 'ngx-translate-messageformat-compiler';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopNavComponent,
    FooterComponent,
    ErrorComponent,
    PromptDialogComponent,
    NotActivatedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    LayoutModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,

    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        },

        // compiler configuration
        // compiler: {
        //   provide: TranslateCompiler,
        //   useClass: TranslateMessageFormatCompiler
        // }
    }),
  ],
  providers: [
    CookieService,
    // app-configuration
    AppConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: AppConfigurationFactory,
      deps: [AppConfigurationService, HttpClient], multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ErrorComponent,
    PromptDialogComponent
  ]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function AppConfigurationFactory( appConfiguration: AppConfigurationService ) {
  return () => appConfiguration.ensureInit();
}

