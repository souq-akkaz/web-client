import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../pages/auth/services/auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) {}

  async init() {
    try {
      const currentUser = await this._authService.getCurrentUser$.toPromise();
      const userAuth = {
        id: currentUser.id,
        refreshToken: this._localStorageService.get('userAuth.refreshToken') as string,
        token: this._localStorageService.get('userAuth.token') as string,
        username: currentUser.username
      };
      this._authService.setUserAuth(userAuth);
      this._router.navigate(['']);
    } catch (exc) {
      this._authService.flushUserAuth();
    }
  }
}
