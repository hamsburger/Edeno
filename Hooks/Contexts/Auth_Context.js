import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext([{}, () => {}]);

export function AuthProvider({ children }) {
  const [isSignedIn, dispatch] = useReducer(AuthReducer, false);

  return (
    <AuthContext.Provider value={[isSignedIn, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

function AuthReducer(isSignedIn, action) {
  switch (action.type) {
    case "sign-in": {
      // can do backend stuff here for auth like storing tokens and stuff
      if (true) {
        // if (action.password == "123") {
        isSignedIn = true;
        // }
      }
      return isSignedIn;
    }
    case "sign-up": {
      isSignedIn = false;
      return isSignedIn;
    }
    case "sign-out": {
      isSignedIn = false;
      return isSignedIn;
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
