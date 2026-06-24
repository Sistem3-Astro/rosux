import React, { createContext, useContext, useState } from "react";

export const FormContext = createContext<any>(null);
// 2. Provider (memoria global)
export const FormProvider = ({ children }: any) => {
  const [formulario, setFormulario] = useState({
    idUsuario: "",
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

    producto: '',
    monto: 0.0,
    plazo: '',
    frecuencia: '',
    motivo:'',

    salario: 0.0,
    ventas: 0.0,
    otrosIngresos: 0.0,
    ingresoConyuge: 0.0,

    renta: 0.0,
    gServicio: 0.0,
    gFamiliar: 0.0,
    gVenta: 0.0,
    gCirculoc: 0.0,
    gAdmin: 0.0,
    gEscolar: 0.0,
    gAlim: 0.0,
    gCalzVes: 0.0,
    gVeh: 0.0,
    gTransp: 0.0,
    creditoAct: '',

    nomBenf: '',
    lugarNacBenf:'',
    fechaNacBenf:null as Date | null,
    direccionBenf:'',
    parentesco:'',
    edad:0,
    ingresos:0.0,
    egresos:0.0,

    
  });

 const updateField = <K extends keyof typeof formulario>(
  campo: K,
  valor: (typeof formulario)[K]
) => {
  setFormulario(prev => ({
    ...prev,
    [campo]: valor,
  }));
};

   const resetFormulario = () => {
    setFormulario({
    idUsuario: "",
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

    producto: '',
    monto: 0.0,
    plazo: '',
    frecuencia: '',
    motivo:'',

    salario: 0.0,
    ventas: 0.0,
    otrosIngresos: 0.0,
    ingresoConyuge: 0.0,

    renta: 0.0,
    gServicio: 0.0,
    gFamiliar: 0.0,
    gVenta: 0.0,
    gCirculoc: 0.0,
    gAdmin: 0.0,
    gEscolar: 0.0,
    gAlim: 0.0,
    gCalzVes: 0.0,
    gVeh: 0.0,
    gTransp: 0.0,
    creditoAct: '',
    
    nomBenf: '',
    lugarNacBenf:'',
    fechaNacBenf:null as Date | null,
    direccionBenf:'',
    parentesco:'',
    edad:0,
    ingresos:0.0,
    egresos:0.0,
    
     
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