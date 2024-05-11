import { CanActivateFn, Router } from '@angular/router';

import { AuthServiceService } from '../services/auth-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {


  const auth = inject(AuthServiceService);
  const router = inject(Router)

  if(auth.isAuth.value){
    router.navigate(['/dashboard']);
  }
  return true;
};

export const signGuard: CanActivateFn = (route, state) => {


  const auth = inject(AuthServiceService);
  const router = inject(Router)

  if(auth.isAuth.value){
    router.navigate(['/dashboard']);
  }
  return true;
};

export const OtherGuard: CanActivateFn = (route, state) => {


  const auth = inject(AuthServiceService);
  const router = inject(Router)

  if(auth.isAuth.value == false){
    router.navigate(['/']);
  }
  return true;
};

