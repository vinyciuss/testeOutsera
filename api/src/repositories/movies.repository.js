import db from "../db/db.js";

async function getMovies(){
    try{
        return db.prepare('SELECT * FROM movies').all();
    } catch (err) {
        throw err;
    }
}

export default {
    getMovies
}