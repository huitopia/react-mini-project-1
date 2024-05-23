import { createContext } from "react";

export const LoginContext = createContext(null);
export function LoginProvider({ children }) {
  return <LoginContext.Provider value={null}>{children}</LoginContext.Provider>;
}
