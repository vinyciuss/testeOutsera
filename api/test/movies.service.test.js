const supertest = require('supertest');
const request = supertest('http://localhost:3000/worse_movies');

describe("Deve ser possível obter os produtores premiados", () => {
    test("Retorna o produtor que obteve 2 prêmios mais rápido", async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        expect(response.body.min.interval).toBe(1);
    });

    test("Retorna o produtor com maior intervalor entre dois prêmios", async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        expect(response.body.max.interval).toBe(13);
    });
});