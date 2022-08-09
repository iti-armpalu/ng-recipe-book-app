import { Action } from "@ngrx/store";

// export const LOGIN = 'LOGIN';
// export const LOGOUT = 'LOGOUT';

// For bigger applications it might be that different stores need to use the same identifier, that's why it's a good practice to set up th identifiers the following way - aka prefixing:

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: {
    email: string; 
    userId: string; 
    token: string; 
    expirationDate: Date
  }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  // Nothing else to be added, as when the user logs out, there is no data we need to collect
}

export type AuthActions = 
| Login 
| Logout;