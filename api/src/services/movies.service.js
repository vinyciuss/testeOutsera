import MoviesRepository from "../repositories/movies.repository.js";

async function getMovies(){
    const movie = await MoviesRepository.getMovies();
    if (!movie || !movie.length) throw new Error("Erro ao obter os títulos!");
    return movie;
}

export default {
    getMovies
}