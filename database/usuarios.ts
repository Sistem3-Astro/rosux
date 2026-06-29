import * as Crypto from 'expo-crypto';
import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('rosux.db');

export const initDatabase = async () => {
  await db.execAsync(`
  
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre_completo TEXT NOT NULL,
      clave TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      sucursal TEXT NOT NULL,
      rol TEXT NOT NULL DEFAULT 'usuario',
      activo INTEGER NOT NULL DEFAULT 1,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS cliente (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      idusuario INTEGER,
      nombreC TEXT,
      fechaNac TEXT,
      lugarNac TEXT,
      genero TEXT,
      telefono TEXT,
      estadoCivil TEXT,
      escolaridad TEXT,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (idusuario)
      REFERENCES usuarios(id)
    );

    CREATE TABLE IF NOT EXISTS vivienda (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_cliente INTEGER,
      direccionC TEXT,
      entreCalle TEXT,
      vivienda TEXT,
      tiempoHab TEXT,
      tipoViv TEXT,
      haberesH TEXT,
      valorV TEXT,
      servicios TEXT,
      descripV TEXT,

      FOREIGN KEY (id_cliente)
      REFERENCES clientes(id)
    );


    CREATE TABLE IF NOT EXISTS actividad (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_cliente INTEGER,
      actividadE TEXT,
      actividadEAd TEXT,
      antiguedadL TEXT,
      domicilioNeg TEXT,
      telefonoNeg TEXT, 
      nombreConyuge TEXT,
      lugarNacConyuge TEXT,
      fechaNacConyuge DATETIME,
      telefonoConyuge TEXT,
      ocupacionConyuge TEXT,
      antiguedadLConyuge TEXT,
      direccionLConyuge TEXT,
      nombreHijos TEXT,
      ref1Nombre TEXT,
      ref1Direccion TEXT,
      ref1Telefono TEXT,
      ref2Nombre TEXT,
      ref2Direccion TEXT,
      ref2Telefono TEXT,

      FOREIGN KEY (id_cliente)
      REFERENCES clientes(id)
    );

     CREATE TABLE IF NOT EXISTS credito (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_cliente INTEGER,
      producto TEXT,
      monto REAL DEFAULT 0,
      plazo TEXT,
      frecuencia TEXT,
      motivo TEXT,

      FOREIGN KEY (id_cliente)
      REFERENCES clientes(id)
    );

    CREATE TABLE IF NOT EXISTS ingresos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_cliente INTEGER,
      salario REAL DEFAULT 0,
      ventas REAL DEFAULT 0,
      otrosIngresos REAL DEFAULT 0,
      ingresoConyuge REAL DEFAULT 0,

      FOREIGN KEY (id_cliente)
      REFERENCES clientes(id)
    );

    CREATE TABLE IF NOT EXISTS egresos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_cliente INTEGER,
      renta REAL DEFAULT 0,
      gServicio REAL DEFAULT 0,
      gFamiliar REAL DEFAULT 0,
      gVenta REAL DEFAULT 0,
      gCirculoc REAL DEFAULT 0,
      gAdmin REAL DEFAULT 0,
      gEscolar REAL DEFAULT 0,
      gAlim REAL DEFAULT 0,
      gCalzVes REAL DEFAULT 0,
      gVeh REAL DEFAULT 0,
      gTransp REAL DEFAULT 0,
      creditoAct TEXT,

      FOREIGN KEY (id_cliente)
      REFERENCES clientes(id)
    );

    CREATE TABLE IF NOT EXISTS beneficiario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_cliente INTEGER,
      nomBenf TEXT,
      lugarNacBenf TEXT,
      fechaNacBenf TEXT,
      direccionBenf TEXT,
      parentesco TEXT,
      edad INTEGER,
      ingresos REAL,
      egresos REAL,

      FOREIGN KEY (id_cliente)
      REFERENCES clientes(id)
    );


  `);

  const admin = await db.getFirstAsync(
    'SELECT id FROM usuarios WHERE clave = ?',
    ['admin']
  );

  if (!admin) {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      'Saul123'
    );

    await db.runAsync(
      `INSERT INTO usuarios
      (nombre_completo, clave, password_hash, sucursal, rol)
      VALUES (?, ?, ?, ?, ?)`,
      ['Administrador', 'admin', hash, 'Corporativo', 'administrador']
    );

   
  }
};
