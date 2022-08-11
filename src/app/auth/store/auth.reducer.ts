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

export function authReducer(
  state: State = initialState, 
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email, 
        action.payload.userId, 
        action.payload.token, 
        action.payload.expirationDate
      );
      return {
        ...state, // Always copy the old state first
        authError: null,
        user: user, // Then overwrite the user property and store my new user
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state, // Always copy the old state first
       user: null // Then overwrite the user property and clear the user property
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state, // Always copy the old state first
        authError: null, // Then overwrite the authError and set it back to null
        loading: true
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state, // Always copy the old state first
        user: null, // Then overwrite the user property and clear the user property
        authError: action.payload, // Then overwrite the authError and set it back to null
        loading: false
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state, // Always copy the old state first
        authError: null // Then overwrite the authError and set it back to null
      };
    default:
      return state;
  }
  }