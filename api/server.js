import express from 'express';
import cors from "cors";
import importCsvToDb from "./src/db/import.js";

const app = express();
app.use(express.json());
app.use(cors());
// app.use('/');

await importCsvToDb('api/src/data/data.csv');
app.listen(3000, () => {
  console.log(`API started on http://localhost:3000!`);
});
