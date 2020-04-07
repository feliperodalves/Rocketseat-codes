const request = require('supertest');
const app = require('../../src/app');
const conn = require('../../src/database');

describe('ONG', () => {
  beforeEach(async () => {
    await conn.migrate.rollback();
    await conn.migrate.latest();
  });

  afterAll(async () => {
    await conn.destroy();
  });
  it('should be able to create', async () => {
    const response = await request(app).post('/ongs').send({
      name: 'Ong test',
      email: 'ongteste@test.com',
      whatsapp: '11111111111',
      city: 'Cidade Teste',
      uf: 'TS',
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
