// context/AuthContext.tsx

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [usuario, setUsuario] = useState<any>(null);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        setUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);