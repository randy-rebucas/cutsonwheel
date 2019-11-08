import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotActivatedComponent } from './not-activated/not-activated.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';

const appRoutes: Routes = [
    {
      path: '',
      loadChildren: './public/public.module#PublicModule'
    },
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

