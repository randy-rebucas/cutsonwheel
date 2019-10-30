import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
    { path: '', component: DashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false, preloadingStrategy: PreloadAllModules }
        )
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {

}

