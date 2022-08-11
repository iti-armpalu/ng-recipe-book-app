import { Action } from "@ngrx/store";

// export const LOGIN = 'LOGIN';
// export const LOGOUT = 'LOGOUT';

// For bigger applications it might be that different stores need to use the same identifier, that's why it's a good practice to set up th identifiers the following way - aka prefixing:
export const LOGIN_START = '[Auth] Login Start';
// For signup only SIGNUP_START is needed as success and fail are the same code as for login and therefore, we can renam the const LOGIN to AUTHENTICATED_SUCCESS and LOGIN_FAIL to AUTHENTICATED_FAIL
// export const LOGIN = '[Auth] Login';
// export const LOGIN_FAIL = '[Auth] Login Fail';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login';

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: {
    email: string; 
    password: string; 
  }) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(public payload: {
    email: string; 
    userId: string; 
    token: string; 
    expirationDate: Date
  }) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: {
    email: string; 
    password: string; 
  }) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class Logout implements Action {
  readonly type = LOGOUT;
  // Nothing else to be added, as when the user logs out, there is no data we need to collect
}


export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
  // Needs no constructor as has no payload (the payload is what the store is going to update itself to be)
}

export type AuthActions = 
| LoginStart
| AuthenticateSuccess
| AuthenticateFail
| SignupStart
| ClearError
| Logout
| AutoLogin;