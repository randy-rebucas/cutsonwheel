import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { HomeComponent } from './public/home/home.component';
// import { AboutComponent } from './public/about/about.component';
// import { ContactComponent } from './public/contact/contact.component';
// import { TeamsComponent } from './public/teams/teams.component';
// import { HowItWorksComponent } from './public/how-it-works/how-it-works.component';

import { AuthGuard } from './auth/auth-guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotActivatedComponent } from './not-activated/not-activated.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';

const appRoutes: Routes = [
    {
      path: '',
      loadChildren: './public/public.module#PublicModule'
    },
    // { path: '', component: HomeComponent },
    // { path: 'about', component: AboutComponent },
    // { path: 'teams', component: TeamsComponent },
    // { path: 'contact', component: ContactComponent },
    // { path: 'how-it-works', component: HowItWorksComponent },

    { path: 'not-activated', component: NotActivatedComponent },
    {
      path: 'setup',
      loadChildren: './setup/setup.module#SetupModule'
    },
    {
      path: 'classification',
      loadChildren: './private/classification/classification.module#ClassificationModule'
    },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false, preloadingStrategy: PreloadAllModules }
        )
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {

}

