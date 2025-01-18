import { removeTokens, setAccessToken, setRefreshToken } from "../utils/tokenUtil";


interface AuthState {
  isLoggedIn: boolean;
  isGuest: boolean;
  error: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    isGuest: false,
    error: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      setAccessToken(action.payload);
      
      return { 
        ...state, 
        isLoggedIn: true,
        isGuest: false
      };
    case 'LOGOUT_SUCCESS':
      removeTokens();

      return { 
        ...state, 
        isLoggedIn: false,
      };
    case 'REFRESH_TOKEN_SUCCESS':
      setRefreshToken(action.payload);

      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
  