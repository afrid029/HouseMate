import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OtherGuard, authGuard, signGuard } from './Guards/auth.guard';
import { WrongUrlComponent } from './components/wrong-url/wrong-url.component';


const routes: Routes = [
  {
    path: '',
    loadChildren:() => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [authGuard],
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: ''
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule),
    canActivate: [signGuard]
  },
  {
    path: 'dashboard',
    canActivate : [OtherGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: '**',
    component: WrongUrlComponent

  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
