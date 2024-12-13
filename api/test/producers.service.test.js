const supertest = require('supertest');
const request = supertest('http://localhost:3000/winning_producers');
const expectedData = require('../src/data/expectDataTest.json');
const { compareFileHashes } = require('../src/helper/helper.js');


describe("Deve ser possível obter os produtores premiados", () => {
    test("Retorna o produtor que obteve 2 prêmios mais rápido", async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        expect(response.body.min[0].interval).toBe(1);
    });

    test("Retorna o produtor com maior intervalo entre dois prêmios", async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        expect(response.body.max[0].interval).toBe(22);
    });
});

describe("Deve garantir que os dados do arquivo não tenham sido alterados", () => {
    test('Verifica se o resultado retornado é igual ao pré-definido', async () => {
        const response = await request.get('/');
        expect(response.body).toEqual(expectedData);
    });

    test('Verifica se houve alguma alteração no arquivo', async () => {
        const response = await compareFileHashes('api/src/data/data.csv', 'api/src/data/data-temp.csv');
        expect(response).toBe(true);
    });

});