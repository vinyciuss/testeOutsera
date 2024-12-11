import MoviesService from "../services/movies.service.js";

async function getMovies(req, res, next){
    try {
        res.send(await MoviesService.getMovies());
    } catch (err) {
        next(err);
    }
}

export default {
    getMovies
}