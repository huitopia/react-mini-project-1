import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const LoginContext = createContext(null);
export function LoginProvider({ children }) {
  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token : " + token);
    if (token === null) {
      return;
    }
    login(token);
  }, []);

  const [expired, setExpired] = useState(0);
  // isLoggedIn
  const isLoggedIn = () => {
    // 현재 날짜 < token
    return Date.now() < expired * 1000;
  };
  // 권한 있는 지? 확인
  function hasAccess(param) {
    return id == param;
  }
  // login
  const login = (token) => {
    localStorage.setItem("token", token);
    const payload = jwtDecode(token);
    setExpired(payload.exp);
    setId(payload.sub);
    setNickName(payload.nickName);
  };
  // logout
  const logout = () => {
    localStorage.removeItem("token");
    setExpired(0);
    setId("");
    setNickName("");
  };

  return (
    <LoginContext.Provider
      value={{
        id,
        nickName,
        login,
        logout,
        isLoggedIn,
        hasAccess,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
