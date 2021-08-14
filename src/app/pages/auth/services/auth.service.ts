import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

interface ISignupData {
  username: string;
  password: string;
  email: string;
}

interface ISignupResponse {
  user: { id: number; username: string };
  token: string;
  refreshToken: string;
}

interface IAuthState {
  userAuth: { id: number; username: string; token: string; refreshToken: string } | null;
}

interface ICurrentUserResponse {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  state$ = new BehaviorSubject<IAuthState>({
    userAuth: localStorage.getItem('userAuth')
      ? JSON.parse(localStorage.getItem('userAuth') as string)
      : null
  });
  constructor(private _http: HttpClient) { }

  getCurrentUser$ = this._http.get<ICurrentUserResponse>(
    `${environment.api}/v1/auth/current-user`
  )
    .pipe(shareReplay());

  selectState(selector: keyof IAuthState): Observable<IAuthState[keyof IAuthState]> {
    return this.state$.pipe(map((x) => x[selector]));
  }

  setUserAuth(data: IAuthState['userAuth']) {
    localStorage.setItem('userAuth', JSON.stringify(data));
    this.state$.next({
      userAuth: {
        id: data!.id,
        username: data!.username,
        token: data!.token,
        refreshToken: data!.refreshToken
      }
    });
  }

  flushUserAuth(): void {
    localStorage.removeItem('userAuth');
    this.state$.next({
      userAuth: null
    });
  }

  signup(data: ISignupData) {
    return this._http.post<ISignupResponse>(`${environment.api}/v1/auth/signup`, data)
      .pipe(tap((resp) => {
        this.setUserAuth({
          id: resp.user.id,
          refreshToken: resp.refreshToken,
          token: resp.token,
          username: resp.user.username
        });
      }));
  }
}
