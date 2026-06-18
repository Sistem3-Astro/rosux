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
