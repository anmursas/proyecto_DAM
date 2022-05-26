import AuthService from "../services/auth.service";
import React from "react";

const AuthVeryfy = () => {
    
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      return null;
    }
  };

  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
    const decodedJwt = parseJwt(user.accessToken);
    if (decodedJwt.exp * 1000 < Date.now()) {
      AuthService.logout();
    }
  }

  return <div>
  </div>;
};

export default AuthVeryfy;
