import * as SQLite from 'expo-sqlite';

// Definimos el nombre de la base de datos para la app Rosus
const NOMBRE_DB = 'rosus_local.db';

export const obtenerDB = async () => {
  return await SQLite.openDatabaseAsync(NOMBRE_DB);
};

// Función global que inicializa todas tus tablas
export const inicializarBaseDeDatos = async () => {
  try {
    const db = await obtenerDB();
    
    // Optimizamos SQLite para móviles (WAL y llaves foráneas activas)
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;

      -- 1. TABLA ASESOR
      CREATE TABLE IF NOT EXISTS "Asesor" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        "nombre" TEXT,
        "ClaveSAFI" TEXT,
        "Contraseña" TEXT,
        "Sucursal" TEXT
      );

      -- 2. TABLA CLIENTE (Añadimos 'sincronizado' para controlar el envío a Google Sheets)
      CREATE TABLE IF NOT EXISTS "Cliente" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        "asesor_id" INTEGER,
        "nombre" TEXT,
        "fechaNacimiento" TEXT,
        "lugarNacimmiento" TEXT,
        "genero" TEXT,
        "estadoCivil" TEXT,
        "telefono" INTEGER,
        "escolaridad" TEXT,
        "sincronizado" INTEGER DEFAULT 0,
        FOREIGN KEY ("asesor_id") REFERENCES "Asesor"("id") ON UPDATE NO ACTION ON DELETE NO ACTION
      );

      -- 3. TABLA VIVIENDA
      CREATE TABLE IF NOT EXISTS "Vivienda" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        "Cliente_id" INTEGER,
        "direccion" TEXT,
        "entreCalles" TEXT,
        "vivienda" TEXT,
        "tiempoHabitado" TEXT,
        "tipoVivienda" TEXT,
        "haberHogar" TEXT,
        "servicios" TEXT,
        "valorVivienda" REAL,
        "descripcion" TEXT,
        FOREIGN KEY ("Cliente_id") REFERENCES "Cliente"("id") ON UPDATE NO ACTION ON DELETE NO ACTION
      );

      -- 4. TABLA ACTIVIDAD ECONOMICA
      CREATE TABLE IF NOT EXISTS "ActividadEconomica" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        "Cliente_id" INTEGER,
        "empleo" TEXT,
        "actEconomicaAdicional" TEXT,
        "antiguedadLaboral" TEXT,
        "domicilioNegocio" TEXT,
        "telefonoNegocio" INTEGER,
        "nombreConyuge" TEXT,
        "fechaNacimientoConyuge" TEXT,
        "lugarNacimientoConyuge" TEXT,
        "telefonoConyuge" INTEGER,
        "ocupacionConyue" TEXT,
        "antiguedadLabConyuge" TEXT,
        "DirecTrabajoConyuge" TEXT,
        "nombreHijo1" TEXT,
        "nombreHijo2" TEXT,
        FOREIGN KEY ("Cliente_id") REFERENCES "Cliente"("id") ON UPDATE NO ACTION ON DELETE NO ACTION
      );

      -- 5. TABLA CREDITO
      CREATE TABLE IF NOT EXISTS "Credito" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        "producto" TEXT,
        "montoSolicitado" REAL,
        "plazo" TEXT,
        "frecuencia" TEXT,
        "motivoCredito" TEXT,
        "cliente_id" INTEGER,
        FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id") ON UPDATE NO ACTION ON DELETE NO ACTION
      );

      -- 6. TABLA INGRESOS
      CREATE TABLE IF NOT EXISTS "Ingresos" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        "salario" REAL,
        "ventas" REAL,
        "otrosIngresos" REAL,
        "ingresoConyuge" REAL,
        "cliente_id" INTEGER,
        FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id") ON UPDATE NO ACTION ON DELETE NO ACTION
      );

      -- 7. TABLA EGRESOS
      CREATE TABLE IF NOT EXISTS "Egresos" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        "renta" REAL,
        "servicios" REAL,
        "gastosFamiliares" REAL,
        "gastosVenta" REAL,
        "otrosGastosCC" REAL,
        "gastosAdministracion" REAL,
        "gastosEscolares" REAL,
        "gastosAlimentacion" REAL,
        "gastosCalzadoVestido" REAL,
        "gastoVehiculoParti" REAL,
        "gastoTranspLoc" REAL,
        "creditosActivos" TEXT,
        "cliente_id" INTEGER,
        FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id") ON UPDATE NO ACTION ON DELETE NO ACTION
      );

      -- 8. TABLA BENEFICIARIO
      CREATE TABLE IF NOT EXISTS "Beneficiario" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        "nombre" TEXT,
        "lugarNacimiento" TEXT,
        "fechaNacimiento" TEXT,
        "direccion" TEXT,
        "parentesco" TEXT,
        "edad" INTEGER,
        "ingresos" REAL,
        "egresos" REAL,
        "cliente_id" INTEGER,
        FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id") ON UPDATE NO ACTION ON DELETE NO ACTION
      );
    `);
    
    console.log("¡Estructura de Rosus creada exitosamente en el dispositivo!");
  } catch (error) {
    console.error("Error al inicializar las tablas de Rosus:", error);
  }
};