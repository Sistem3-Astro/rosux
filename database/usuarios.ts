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

    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_usuario INTEGER,
      nombreC TEXT,
      fechaNac TEXT,
      lugarNac TEXT,
      genero TEXT,
      telefono TEXT,
      estadoCivil TEXT,
      escolaridad TEXT,

      FOREIGN KEY (id_usuario)
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
      descripV TEXT

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
      'AdminTI2602'
    );

    await db.runAsync(
      `INSERT INTO usuarios
      (nombre_completo, clave, password_hash, sucursal, rol)
      VALUES (?, ?, ?, ?, ?)`,
      ['Administrador', 'admin', hash, 'Corporativo', 'administrador']
    );

   
  }
};
