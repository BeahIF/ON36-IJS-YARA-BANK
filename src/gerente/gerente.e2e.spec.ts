import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('GerenteController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/gerentes/criar (POST)', async () => {
    const gerenteDto = { id: 1, nome: 'Carlos' };

    const response = await request(app.getHttpServer())
      .post('/gerentes/criar')
      .send(gerenteDto)
      .expect(201);

    expect(response.body).toEqual({ message: `Gerente Carlos criado com sucesso.` });
  });

  it('/gerentes/:id (GET)', async () => {
    await request(app.getHttpServer())
      .get('/gerentes/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(1);
        expect(res.body.nome).toBe('Carlos');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
