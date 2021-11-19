import {
  createContext,
  useREducer,
  useEffect,
} from "core-js/library/fn/reflect/es7/metadata";
import { auth_ } from "../firebase/config";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch ((action, type)) {
    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    case AUTH_IS_READY:
      return { user: action.payload, authIsReady: true };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = userReducer(authReducer, {
    user: null,
    authIsReady: false,
  });
};

useEffect(() => {
  const unsub = projectAuth.onAuthStateChanged((user) => {
    dispatch({ type: "AUTH_ISREADY", payload: user });
    unsub();
  });
}, []);

console.log("AuthContext state", state);

return (
  <AuthContext.Provider value={{ ...state, dispatch }}>
    {children}
  </AuthContext.Provider>
);
