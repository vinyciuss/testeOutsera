import db from "../db/db.js";

async function getProducers(){
    try{
        return db.prepare('SELECT * FROM movies').all();
    } catch (err) {
        throw err;
    }
}

export default {
    getProducers
}