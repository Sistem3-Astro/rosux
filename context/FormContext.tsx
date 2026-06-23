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
    gAdministracion: 0.0,
    gEscolar: 0.0,
    gAlimentacion: 0.0,
    gCalzadoyVestido: 0.0,
    gVehiculo: 0.0,
    gTransporteL: 0.0,
    CreditoActivo: '',

    
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
    gAdministracion: 0.0,
    gEscolar: 0.0,
    gAlimentacion: 0.0,
    gCalzadoyVestido: 0.0,
    gVehiculo: 0.0,
    gTransporteL: 0.0,
    CreditoActivo: '',
    
    
     
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