import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const LoginContext = createContext(null);
export function LoginProvider({ children }) {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [expired, setExpired] = useState(0);

  // isLoggedIn
  const isLoggedIn = () => {
    // 현재 날짜 < token
    return Date.now() < expired * 1000;
  };
  // hasEmail
  const hasEmail = (param) => {
    return email === param;
  };
  // login
  const login = (token) => {
    localStorage.setItem("token");
    const payload = jwtDecode(token);
    setExpired(payload.exp);
    setEmail(payload.sub);
    setNickName(payload.nickName);
  };
  // logout
  const logout = () => {
    localStorage.removeItem("token");
    setExpired(0);
    setEmail("");
    setNickName("");
  };

  return (
    <LoginContext.Provider
      value={{
        email,
        nickName,
        login,
        logout,
        isLoggedIn,
        hasEmail,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
