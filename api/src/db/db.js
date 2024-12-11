import Database from 'better-sqlite3';

const db = new Database(':memory:', { verbose: console.log });

db.exec(`
  CREATE TABLE movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    title TEXT NOT NULL,
    studios TEXT NOT NULL,
    producers TEXT NOT NULL,
    winner TEXT NOT NULL
  );
`);

export default db;