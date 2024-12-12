import ProducersRepository from "../repositories/producers.repository.js";

async function getProducers(){
    const producers = await ProducersRepository.getProducers();
    if (!producers || !producers.length) throw new Error("Erro ao obter os títulos!");
    return producers;
}

export default {
    getProducers
}