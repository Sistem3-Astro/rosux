import { useAuth } from "@/context/AuthContext";
import { db } from '@/database/usuarios';
const convertirFecha = (fecha: any) => {
  if (!fecha) return null;

  return fecha instanceof Date
    ? fecha.toISOString()
    : new Date(fecha).toISOString();
};
export async function actualizar(formulario: any, idCliente: number) {
await db.runAsync(
  `UPDATE cliente SET
    nombreC=?,
    fe chaNac=?,
    lugarNac=?,
    genero=?,
    telefono=?,
    estadoCivil=?,
    escolaridad=?
   WHERE id=?`,
  [
    formulario.nombreC,
    convertirFecha(formulario.fechaNac),
    formulario.lugarNac,
    formulario.genero,
    formulario.telefono,
    formulario.estadoCivil,
    formulario.escolaridad,
    idCliente,
  ]
);

await db.runAsync(
  `UPDATE vivienda SET
    direccionC=?,
    entreCalle=?,
    vivienda=?,
    tiempoHab=?,
    tipoViv=?,
    haberesH=?,
    valorV=?,
    servicios=?,
    descripV=?
   WHERE id_cliente=?`,
  [
    formulario.direccionC,
    formulario.entreCalle,
    formulario.vivienda,
    formulario.tiempoHab,
    formulario.tipoViv,
    JSON.stringify(formulario.haberesH),
    formulario.valorV,
    JSON.stringify(formulario.servicios),
    formulario.descripV,
    idCliente,
  ]
);

 await db.runAsync(
  `UPDATE actividad SET
    actividadE=?,
    actividadEAd=?,
    antiguedadL=?,
    domicilioNeg=?,
    telefonoNeg=?,
    nombreConyuge=?,
    lugarNacConyuge=?,
    fechaNacConyuge=?,
    telefonoConyuge=?,
    ocupacionConyuge=?,
    antiguedadLConyuge=?,
    direccionLConyuge=?,
    nombreHijos=?,
    ref1Nombre=?,
    ref1Direccion=?,
    ref1Telefono=?,
    ref2Nombre=?,
    ref2Direccion=?,
    ref2Telefono=?
   WHERE id_cliente=?`,
  [
    formulario.actividadE,
    formulario.actividadEAd,
    formulario.antiguedadL,
    formulario.domicilioNeg,
    formulario.telefonoNeg,
    formulario.nombreConyuge,
    formulario.lugarNacConyuge,
    convertirFecha(formulario.fechaNacConyuge),
    formulario.telefonoConyuge,
    formulario.ocupacionConyuge,
    formulario.antiguedadLConyuge,
    formulario.direccionLConyuge,
    formulario.nombreHijos,
    formulario.ref1Nombre,
    formulario.ref1Direccion,
    formulario.ref1Telefono,
    formulario.ref2Nombre,
    formulario.ref2Direccion,
    formulario.ref2Telefono,
    idCliente,
  ]
);

await db.runAsync(
  `UPDATE credito SET
    producto=?,
    monto=?,
    plazo=?,
    frecuencia=?,
    motivo=?
   WHERE id_cliente=?`,
  [
    formulario.producto,
    formulario.monto,
    formulario.plazo,
    formulario.frecuencia,
    formulario.motivo,
    idCliente,
  ]
);

await db.runAsync(
  `UPDATE ingresos SET
    salario=?,
    ventas=?,
    otrosIngresos=?,
    ingresoConyuge=?
  WHERE id_cliente=?`,
  [
    formulario.salario,
    formulario.ventas,
    formulario.otrosIngresos,
    formulario.ingresoConyuge,
    idCliente,
  ]
);

await db.runAsync(
  `UPDATE egresos SET
    renta=?,
    gServicio=?,
    gFamiliar=?,
    gVenta=?,
    gCirculoc=?,
    gAdmin=?,
    gEscolar=?,
    gAlim=?,
    gCalzVes=?,
    gVeh=?,
    gTransp=?,
    creditoAct=?
   WHERE id_cliente=?`,
  [
    formulario.renta,
    formulario.gServicio,
    formulario.gFamiliar,
    formulario.gVenta,
    formulario.gCirculoc,
    formulario.gAdmin,
    formulario.gEscolar,
    formulario.gAlim,
    formulario.gCalzVes,
    formulario.gVeh,
    formulario.gTransp,
    formulario.creditoAct,
    idCliente,
  ]
);

await db.runAsync(
 `UPDATE beneficiario SET
   nomBenf=?,
   lugarNacBenf=?,
   fechaNacBenf=?,
   direccionBenf=?,
   parentesco=?,
   edad=?,
   ingresos=?,
   egresos=?
  WHERE id_cliente=?`,
  [   
    formulario.nomBenf,
    formulario.lugarNacBenf,
    convertirFecha(formulario.fechaNacBenf),
    formulario.direccionBenf,
    formulario.parentesco,
    formulario.edad,
    formulario.ingresos,
    formulario.egresos,
    idCliente,
  ]
);
}