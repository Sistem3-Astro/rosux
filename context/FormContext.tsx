import React, { createContext, useState } from "react";

// 1. Crear el contexto
export const FormContext = createContext<any>(null);

// 2. Provider (memoria global)
export const FormProvider = ({ children }: any) => {
  const [formulario, setFormulario] = useState({
    idAsesor: "",
    nombreC: "",
    fechaNac: "",
    lugarNac: "",
    genero: "",
    telefono: "",
    estadoCivil: "",
    escolaridad: "",
  });

  return (
    <FormContext.Provider value={{ formulario, setFormulario }}>
      {children}
    </FormContext.Provider>
  );
};