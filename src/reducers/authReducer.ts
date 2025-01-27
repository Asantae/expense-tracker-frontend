import { removeTokens, setAccessToken, setRefreshToken } from "../utils/tokenUtil";


interface AuthState {
  isLoggedIn: boolean | null;
  isGuest: boolean | null;
  error: string | null;
}

const initialState: AuthState = {
    isLoggedIn: null,
    isGuest: null,
    error: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'GUEST_REGISTER_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      setAccessToken(action.payload);
      
      return { 
        ...state, 
        isLoggedIn: true,
        isGuest: false
      };
    case 'GUEST_LOGIN_SUCCESS':
      setAccessToken(action.payload);
      
      return { 
        ...state, 
        isLoggedIn: true,
        isGuest: true
      };
    case 'LOGOUT_SUCCESS':
      removeTokens();

      return { 
        ...state, 
        isLoggedIn: false,
        isGuest: false,
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
  