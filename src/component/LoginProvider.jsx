import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const LoginContext = createContext(null);
export function LoginProvider({ children }) {
  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [expired, setExpired] = useState(0);
  const [authority, setAuthority] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token : " + token);
    if (token === null) {
      return;
    }
    login(token);
  }, []);

  // isLoggedIn
  const isLoggedIn = () => {
    // 현재 날짜 < token
    return Date.now() < expired * 1000;
  };
  // 권한 있는 지? 확인
  function hasAccess(param) {
    return id == param;
  }
  function isAdmin() {
    return authority.includes("admin");
  }
  // login
  const login = (token) => {
    localStorage.setItem("token", token);
    const payload = jwtDecode(token);
    setExpired(payload.exp);
    setId(payload.sub);
    setNickName(payload.nickName);
    setAuthority(payload.scope.split(" ")); // "admin manager user"
  };
  // logout
  const logout = () => {
    localStorage.removeItem("token");
    setExpired(0);
    setId("");
    setNickName("");
    setAuthority([]);
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
        isAdmin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
