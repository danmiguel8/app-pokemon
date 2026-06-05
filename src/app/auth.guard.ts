import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const authenticated = await auth.isAuthenticated();
  if (!authenticated) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
