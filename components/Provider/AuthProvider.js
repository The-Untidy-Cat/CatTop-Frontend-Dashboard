import { createContext, useContext } from "react";
import { useAuthController, useFakeAuthController } from "./controllers/auth";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
//   const auth = useAuthController();
    const auth = useAuthController();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
