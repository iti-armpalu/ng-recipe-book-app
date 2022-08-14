import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, reduce, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions'
import { of } from 'rxjs';
import { User } from '../user.model';
import { AuthService } from '../auth.service';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  email: string,
  userId: string,
  token: string,
  expiresIn: number
  ) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  // Store the user data inside localStorage to add autoLogin()
  localStorage.setItem('userData', JSON.stringify(user));
  return AuthActions.authenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true
  });
};


const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred';

  if (!errorRes.error || !errorRes.error.error) {
    return of(AuthActions.authenticateFail( {errorMessage} ));
}
switch (errorRes.error.error.message) {
  case 'EMAIL_EXISTS':
      errorMessage = 'The email address is already in use by another account.';
      break;
  case 'OPERATION_NOT_ALLOWED':
      errorMessage = 'Password sign-in is disabled for this project.';
      break;
  case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
      break;
  case 'EMAIL_NOT_FOUND':
      errorMessage ='There is no user record corresponding to this identifier. The user may have been deleted.';
      break;
  case 'INVALID_PASSWORD':
      errorMessage = 'The password is invalid or the user does not have a password.';
      break;
  case 'USER_DISABLED':
      errorMessage = 'The user account has been disabled by an administrator.';
      break;
  default:
      break;
}
  return of(AuthActions.authenticateFail( {errorMessage} ));
}


@Injectable()
export class AuthEffects {

  authSignup$ = createEffect(
    () => this.actions$.pipe(ofType(AuthActions.signupStart),
    switchMap( action => {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
          {
            email: action.email,
            password: action.password,
            returnSecureToken: true
          }
        ).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
      })
    )
  );

  authLogin$ = createEffect(
    () => this.actions$.pipe(ofType(AuthActions.loginStart),
    switchMap( action => {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
          {
            email: action.email,
            password: action.password,
            returnSecureToken: true
          }
        ).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
      })
    )
  );

  authRedirect$ = createEffect(
    () => this.actions$.pipe(ofType(AuthActions.authenticateSuccess),
    tap( action => action.redirect && this.router.navigate(['/']))
    ),
    { dispatch: false }
  );

  authLogout$ = createEffect(
    () => this.actions$.pipe(ofType(AuthActions.logout),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
    ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(
    () => this.actions$.pipe(ofType(AuthActions.autoLogin),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        // this.user.next(loadedUser);
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return AuthActions.authenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false
        });
        // ExpirationDuration is future date milliseconds minus current date milliseconds difference, and this sets the time until the oken expires for autoLogout
        // const expirationDuration =
        //   new Date(userData._tokenExpirationDate).getTime() -
        //   new Date().getTime();
        // this.autoLogout(expirationDuration);
      }
      return { type: 'DUMMY' };
    })
    ),
    // Comment this line out as otherwise AutoLogin won't work
    // { dispatch: false }
  );


  // Convention is to add a $ after Observable
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
