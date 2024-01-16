import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isSignInGuard: CanActivateFn = (route, state) => {
  const auth = localStorage.getItem('auth'),
    user = localStorage.getItem('user'),
    _router = Inject(Router);
  if (auth && user) return true;
  localStorage.clear();
  _router.navigate(['sign']);
  return false;
};