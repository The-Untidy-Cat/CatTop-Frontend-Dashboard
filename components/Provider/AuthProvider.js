import { createContext, useContext } from "react";
import { useUserController, useFakeAuthController } from "./controllers/auth";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
//   const auth = useUserController();
    const auth = useUserController();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useUser = () => useContext(AuthContext);
