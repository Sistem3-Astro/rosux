import { useAuth } from "@/context/AuthContext";
import { db } from '@/database/usuarios';
export async function guardarSolicitud(formulario: any, usuario: any) {
  // INSERT cliente
  const resultado = await db.runAsync(
  `INSERT INTO cliente (
    idusuario,
    nombreC,
    fechaNac,
    lugarNac,
    genero,
    telefono,
    estadoCivil,
    escolaridad
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    usuario.id,
    formulario.nombreC,
    formulario.fechaNac?.toISOString() ?? null,
    formulario.lugarNac,
    formulario.genero,
    formulario.telefono,
    formulario.estadoCivil,
    formulario.escolaridad,
  ]
  
);
// obtener idCliente
const idCliente = resultado.lastInsertRowId;
  
  // INSERT vivienda
await db.runAsync(
  `INSERT INTO vivienda (
    id_cliente,
    direccionC,
    entreCalle,
    vivienda,
    tiempoHab,
    tipoViv,
    haberesH,
    valorV,
    servicios,
    descripV
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    idCliente,
    formulario.direccionC,
    formulario.entreCalle,
    formulario.vivienda,
    formulario.tiempoHab,
    formulario.tipoViv,
    JSON.stringify(formulario.haberesH),
    formulario.valorV,
    JSON.stringify(formulario.servicios),
    formulario.descripV,
  ]
);
  // INSERT actividad
  await db.runAsync(
  `INSERT INTO actividad (
    id_cliente,
    actividadE,
    actividadEAd,
    antiguedadL,
    domicilioNeg,
    telefonoNeg,
    nombreConyuge,
    lugarNacConyuge,
    fechaNacConyuge,
    telefonoConyuge,
    ocupacionConyuge,
    antiguedadLConyuge,
    direccionLConyuge,
    nombreHijos,
    ref1Nombre,
    ref1Direccion,
    ref1Telefono,
    ref2Nombre,
    ref2Direccion,
    ref2Telefono
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    idCliente,
    formulario.actividadE,
    formulario.actividadEAd,
    formulario.antiguedadL,
    formulario.domicilioNeg,
    formulario.telefonoNeg,
    formulario.nombreConyuge,
    formulario.lugarNacConyuge,
    formulario.fechaNacConyuge?.toISOString() ?? null,
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
  ]
);
  // INSERT crédito
  await db.runAsync(
  `INSERT INTO credito (
    id_cliente,
    producto,
    monto,
    plazo,
    frecuencia,
    motivo
  ) VALUES (?, ?, ?, ?, ?, ?)`,
  [
    idCliente,
    formulario.producto,
    formulario.monto,
    formulario.plazo,
    formulario.frecuencia,
    formulario.motivo,
  ]
);
  // INSERT ingresos
  await db.runAsync(
  `INSERT INTO ingresos (
    id_cliente,
    salario,
    ventas,
    otrosIngresos,
    ingresoConyuge
  ) VALUES (?, ?, ?, ?, ?)`,
  [
    idCliente,
    formulario.salario,
    formulario.ventas,
    formulario.otrosIngresos,
    formulario.ingresoConyuge,
  ]
);
  // INSERT egresos
  await db.runAsync(
  `INSERT INTO egresos (
    id_cliente,
    renta,
    gServicio,
    gFamiliar,
    gVenta,
    gCirculoc,
    gAdmin,
    gEscolar,
    gAlim,
    gCalzVes,
    gVeh,
    gTransp,
    creditoAct
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    idCliente,
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
  ]
);
  // INSERT beneficiario
await db.runAsync(
  `INSERT INTO beneficiario (
   id_cliente,
   nomBenf,
   lugarNacBenf,
   fechaNacBenf,
   direccionBenf,
   parentesco,
   edad,
   ingresos,
   egresos
  )VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    idCliente,
    formulario.nomBenf,
    formulario.lugarNacBenf,
    formulario.fechaNacBenf,
    formulario.direccionBenf,
    formulario.parentesco,
    formulario.edad,
    formulario.ingresos,
    formulario.egresos,
  ]
);
}