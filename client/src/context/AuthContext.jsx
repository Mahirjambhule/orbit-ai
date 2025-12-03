import { createContext, useState, useEffect } from "react";
import config from "../config";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setInitialLoad(false); 
    };
    checkUser();
  }, []);

  const loginCall = async (email, password) => {
    setIsFetching(true);
    try {
      const res = await fetch(`${config.API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setError(false);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error. Is the backend running?");
      console.error(err);
    }
    setIsFetching(false);
  };

  const registerCall = async (username, email, password) => {
    setIsFetching(true);
    try {
      const res = await fetch(`${config.API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      
      const data = await res.json();

      if (res.ok) {
        loginCall(email, password);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Registration failed");
    }
    setIsFetching(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isFetching,
        initialLoad, 
        error,
        loginCall,
        registerCall,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};