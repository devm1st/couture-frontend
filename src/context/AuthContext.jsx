import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebase";
import { loginWithEmail, logoutFirebase } from "../api/auth.api";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || ""; // optional

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setBooting(false);
    });

    return () => unsub();
  }, []);

  const login = async (email, password) => {
    try {
      // const u = await loginWithEmail(email, password);

      // Optional hard restriction to one admin email
      // if (ADMIN_EMAIL && u.email !== ADMIN_EMAIL) {
      //   await logoutFirebase();
      //   toast.error("Unauthorized admin account");
      //   return false;
      // }
      await loginWithEmail(email, password);

      toast.success("Login successful");
      return true;
    } catch (err) {
      toast.error(err?.message || "Login failed");
      return false;
    }
  };

  const logout = async () => {
    await logoutFirebase();
    toast.info("Logged out");
  };

  const value = useMemo(
    () => ({ user, booting, login, logout }),
    [user, booting]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
