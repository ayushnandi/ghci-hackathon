"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext<any>(null);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
