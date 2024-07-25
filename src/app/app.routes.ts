import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { HomePageComponent } from './modules/landing-page/home-page/home-page.component';
import { LayoutComponent } from './core/layout/layout.component';
import { MyOffresComponent } from './modules/landing-page/my-offres/my-offres.component';
import { DashbordLayoutComponent } from './core/dashbord-layout/dashbord-layout.component';
import { CardComponent } from './shared/components/card/card.component';
import { UserLoginComponent } from './modules/auth/user-login/user-login.component';
import { OffersComponent } from './modules/back-office/offers/offers.component';
import { DtiViewComponent } from './modules/back-office/dti-view/dti-view.component';
import { DetailsPageComponent } from './modules/landing-page/details-page/details-page.component';
import { authGuard } from './core/auth.guard';
import { OffersExpiredComponent } from './modules/back-office/offers-expired/offers-expired.component';
import { OffersAcceptedComponent } from './modules/back-office/offers-accepted/offers-accepted.component';
import { OffersDeclineComponent } from './modules/back-office/offers-decline/offers-decline.component';
import { OffresadminComponent } from './modules/back-office/offresadmin/offresadmin.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      { path: '', component: HomePageComponent ,},
      { path: 'offers', component: MyOffresComponent , canActivate:[authGuard]},
      { path: ':id', component: DetailsPageComponent, canActivate:[authGuard]},
    ]

  },
  {
    path: 'auth',
    component:UserLoginComponent
  },
  {
    path: 'dashboard',
    component: DashbordLayoutComponent,
    children: [
      { path: '', component: OffersComponent ,},
      { path: 'all', component: DtiViewComponent ,},
      { path: 'accepted', component: OffersAcceptedComponent ,},
      { path: 'decline', component: OffersDeclineComponent ,},
      { path: 'expired', component: OffersExpiredComponent ,},
      { path: ':id', component: OffresadminComponent ,},
    ]

  },
];
