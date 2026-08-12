const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function abrirBanco() {
  const db = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });

  await db.exec(
    // CREATE TABLE IF NOT EXISTS usuarios (
      //   id INTEGER PRIMARY KEY AUTOINCREMENT,
      //   nome TEXT,
      //   email_institucional TEXT UNIQUE,
      //   perfil TEXT
      // );
      `
    CREATE TABLE IF NOT EXISTS itens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      descricao TEXT,
      local_encontrado TEXT
    )
  `);

  return db;
}

module.exports = abrirBanco;