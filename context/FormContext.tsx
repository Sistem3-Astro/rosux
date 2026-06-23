import React, { createContext, useContext, useState } from "react";

export const FormContext = createContext<any>(null);
// 2. Provider (memoria global)
export const FormProvider = ({ children }: any) => {
  const [formulario, setFormulario] = useState({
    idAsesor: "",
    idCliente:null,  
    nombreC: "",
    fechaNac: null as Date | null,
    lugarNac: "",
    genero: "",
    telefono: "",
    estadoCivil: "",
    escolaridad: "", 

     // VIVIENDA
    direccionC: '',
    entreCalle: '',
    vivienda: '',
    tiempoHab: '',
    tipoViv: '',
    haberesH: [] as string[],
    valorV: '',
    servicios: [] as string[],
    descripV: '',

    actividadE:'',
    actividadEAd:'',
    antiguedadL:'',
    domicilioNeg:'',
    telefonoNeg:'', 
    nombreConyuge:'',
    lugarNacConyuge:'',
    fechaNacConyuge: null as Date | null,
    telefonoConyuge:'',
    ocupacionConyuge:'',
    antiguedadLConyuge:'',
    direccionLConyuge:'',
    nombreHijos:'',
    ref1Nombre:'',
    ref1Direccion:'',
    ref1Telefono:'',
    ref2Nombre:'',
    ref2Direccion:'',
    ref2Telefono:'',
    
  });

  const updateField = (campo: string, valor: any) => {
    setFormulario(prev => ({
      ...prev,
      [campo]: valor,
    }));
  };

   const resetFormulario = () => {
    setFormulario({
      idAsesor: "",
    idCliente:null,  
    nombreC: "",
    fechaNac: null as Date | null,
    lugarNac: "",
    genero: "",
    telefono: "",
    estadoCivil: "",
    escolaridad: "", 
    
    direccionC: '',
    entreCalle: '',
    vivienda: '',
    tiempoHab: '',
    tipoViv: '',
    haberesH: [],
    valorV: '',
    servicios: [],
    descripV: '',

  actividadE:'',
    actividadEAd:'',
    antiguedadL:'',
    domicilioNeg:'',
    telefonoNeg:'', 
    nombreConyuge:'',
    lugarNacConyuge:'',
    fechaNacConyuge: null as Date | null,
    telefonoConyuge:'',
    ocupacionConyuge:'',
    antiguedadLConyuge:'',
    direccionLConyuge:'',
    nombreHijos:'',
    ref1Nombre:'',
    ref1Direccion:'',
    ref1Telefono:'',
    ref2Nombre:'',
    ref2Direccion:'',
    ref2Telefono:'',
     
    });
  };

  return (
    <FormContext.Provider value={{ 
      formulario, 
      setFormulario,
      updateField,
      resetFormulario }}>
      {children}
    </FormContext.Provider>
  );
};
export const useFormulario = () => useContext(FormContext);