import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User
}

const initialState: State = {
  user: null
};

export function authReducer(
  state: State = initialState, 
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email, 
        action.payload.userId, 
        action.payload.token, 
        action.payload.expirationDate
      );
      return {
        ...state, // Always copy the old state first
       user: user // Then overwrite the user property and store my new user
      };
      case AuthActions.LOGOUT:
      return {
        ...state, // Always copy the old state first
       user: null // Then overwrite the user property and clear the user property
      };
    default:
      return state;
  }
  }