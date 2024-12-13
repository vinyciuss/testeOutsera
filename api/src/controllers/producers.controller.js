import ProducersService from "../services/producers.service.js";

function findProducers(data) {
    const producers = {};
    let max = [];
    let min = [];
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
                    max = [
                        {
                            producer: producer,
                            interval: interval,
                            previousWin: years[i - 1],
                            followingWin: years[i]
                        }
                    ];
                } else if (interval === maxInterval) {
                    if (max.length < 2) {
                        max.push({
                            producer: producer,
                            interval: interval,
                            previousWin: years[i - 1],
                            followingWin: years[i]
                        });
                    }
                }
                
                if (interval < minInterval) {
                    minInterval = interval;
                    min = [
                        {
                            producer: producer,
                            interval: interval,
                            previousWin: years[i - 1],
                            followingWin: years[i]
                        }
                    ];
                } else if (interval === minInterval) {
                    if (min.length < 2) {
                        min.push({
                            producer: producer,
                            interval: interval,
                            previousWin: years[i - 1],
                            followingWin:  years[i]
                        });
                    }
                }
            }
        }
    }

    return {
        min,
        max
    };
}

async function getProducers(req, res, next){
    try {
        const result = findProducers(await ProducersService.getProducers())
        if(!Object.keys(result.min).length && !Object.keys(result.max).length) return res.status(204).send();
        res.send(result);
    } catch (err) {
        next(err);
    }
}

export default {
    getProducers
}