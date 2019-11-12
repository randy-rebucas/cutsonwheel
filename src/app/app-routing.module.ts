import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth/auth.guard';

const appRoutes: Routes = [
    {
      path: '',
      loadChildren: './modules/public/public.module#PublicModule'
    },
    {
      path: 'setup',
      loadChildren: './setup/setup.module#SetupModule'
    },
    {
      path: 'classification',
      loadChildren: './private/classification/classification.module#ClassificationModule'
    },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule'},
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

