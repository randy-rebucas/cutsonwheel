import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotActivatedComponent } from './modules/not-activated/not-activated.component';

const routes: Routes = [
  {path: '', loadChildren: './modules/home/home.module#HomeModule'},
  {path: 'about', loadChildren: './modules/about/about.module#AboutModule'},
  {path: 'team', loadChildren: './modules/team/team.module#TeamModule'},
  {path: 'contact', loadChildren: './modules/contact/contact.module#ContactModule'},
  {path: 'book-now', loadChildren: './modules/book-now/book-now.module#BookNowModule'},
  {path: 'auth', loadChildren: './modules/authentication/authentication.module#AuthenticationModule'},
  {path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule'},
  {path: 'checkout', loadChildren: './modules/checkout/checkout.module#CheckoutModule'},
  {path: 'setup', loadChildren: './modules/setup/setup.module#SetupModule'},
  {path: 'not-activated', component: NotActivatedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
