// context/AuthContext.tsx

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [usuario, setUsuario] = useState<any>(null);
  const logout = () => {
    console.log("Adios");
  setUsuario(null);
};

  return (
    <AuthContext.Provider
      value={{
        usuario,
        setUsuario,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);