import fs from 'fs';
import csvParser from'csv-parser';
import db from './db.js';

export default async function importCsvToDb(filePath) {
  const insertStmt = db.prepare('INSERT INTO movies (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)');

  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser({ separator: ';' }))
      .on('data', (row) => {
        results.push(row);
        if (!!row.year && row.year != 'year') insertStmt.run(Number(row.year), row.title, row.studios, row.producers, row.winner);
      })
      .on('end', () => {
        const movies = db.prepare('SELECT * FROM movies').all();
        console.log('Total de registros inseridos:', movies.length);
        console.log('Dados importados com sucesso!');
        resolve(results);
      })
      .on('error', (err) => reject(err));
  });
}
