import MoviesService from "../services/movies.service.js";

function findProducers(data) {
    const producers = {};
    const max = {};
    const min = {};
    let maxInterval = -Infinity; 
    let minInterval = Infinity;  

    data.forEach(item => {
        if (item.winner === "yes") {
            let parts = [];
            parts = [...item.producers.split(/,|\s+and\s+/)];
            parts.forEach(part => {
                if (!!part.trim() && !producers[part.trim()]) producers[part.trim()] = [];
                if (!!producers[part.trim()]) producers[part.trim()].push(item.year);
            });
        }
    });

    for (let producer in producers) {
        const years = producers[producer].sort((a, b) => a - b); 
        
        if (years.length > 1) {
            for (let i = 1; i < years.length; i++) {
                const interval = years[i] - years[i - 1];

                if (interval > maxInterval) {
                    maxInterval = interval;
                    max.producer = producer;
                    max.interval = interval;
                    max.previousWin = producers[producer][0];
                    max.followingWin = producers[producer][producers[producer].length -1];
                }

                if (interval < minInterval) {
                    minInterval = interval;
                    min.producer = producer;
                    min.interval = interval;
                    min.previousWin = producers[producer][0];
                    min.followingWin = producers[producer][producers[producer].length -1];
                }
            }
        }
    }

    return {
        min,
        max
    };
}

async function getMovies(req, res, next){
    try {
        const result = findProducers(await MoviesService.getMovies())

        //fazer algum retorno para caso nao venham dados
        res.send(result);
    } catch (err) {
        next(err);
    }
}

export default {
    getMovies
}