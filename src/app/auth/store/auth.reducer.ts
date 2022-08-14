import { Action, createReducer, on } from '@ngrx/store';

import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

const _authReducer = createReducer(
  initialState,

  on(
    AuthActions.loginStart,
    AuthActions.signupStart,
    (state) => ({
      ...state, // Always copy the old state first
      authError: null, // Then overwrite the authError and set it back to null
      loading: true
    })
  ),

  on(
    AuthActions.authenticateSuccess,
    (state, action) => ({
      ...state, // Always copy the old state first
      authError: null, // Then overwrite the user property and store my new user
      loading: false,
      user: new User(
        action.email,
        action.userId,
        action.token,
        action.expirationDate
      )
    })
  ),

  on(
    AuthActions.authenticateFail,
    (state, action) => ({
      ...state, // Always copy the old state first
      user: null, // Then overwrite the user property and clear the user property
      authError: action.errorMessage,
      loading: false
    })
  ),

  on(
    AuthActions.logout,
    (state) => ({
      ...state, // Always copy the old state first
      user: null // Then overwrite the user property and clear the user property
    })
  ),

  on(
    AuthActions.clearError,
    (state) => ({
      ...state,
      authError: null
    })
  ),

);

export function authReducer(state: State, action: Action) {
  return _authReducer(state, action);
}

