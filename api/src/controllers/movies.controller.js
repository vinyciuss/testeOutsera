import MoviesService from "../services/movies.service.js";

function findProducers(data) {
    const producers = {};

    data.forEach(item => {
        if (item.winner === "yes") {
            if (!producers[item.producers]) {
                producers[item.producers] = [];
            }
            producers[item.producers].push(item.year);
        }
    });

    let maxIntervalProducer = null;
    let maxInterval = -Infinity; 
    let minIntervalProducer = null;
    let minInterval = Infinity;  

    for (let producer in producers) {
        const years = producers[producer].sort((a, b) => a - b); 
        
        if (years.length > 1) {
            for (let i = 1; i < years.length; i++) {
                const interval = years[i] - years[i - 1];

                if (interval > maxInterval) {
                    maxInterval = interval;
                    maxIntervalProducer = producer;
                }

                if (interval < minInterval) {
                    minInterval = interval;
                    minIntervalProducer = producer;
                }
            }
        }
    }

    return {
        maxIntervalProducer,
        maxInterval,
        minIntervalProducer,
        minInterval
    };
}

async function getMovies(req, res, next){
    try {

        const result = findProducers(await MoviesService.getMovies())

        // res.send(findProducers(await MoviesService.getMovies()));

        
        res.send({titulos:[{maior: result.maxIntervalProducer,
                  intervalo: result.maxInterval},
                  {menor: result.minIntervalProducer,
                  intervalo: result.minInterval}]});

        // res.send(await MoviesService.getMovies());
    } catch (err) {
        next(err);
    }
}

export default {
    getMovies
}