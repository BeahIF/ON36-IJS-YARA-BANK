import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ClienteModule } from './cliente.module';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';

describe('ClienteController (integração)', () => {
  let app: INestApplication;

  let clienteService = {
    adicionarCliente: jest.fn().mockImplementation((cliente: Cliente) => cliente),
    obterCliente: jest.fn().mockImplementation((id: number) => ({
      id,
      nome: 'Beatriz',
    })),
  };


  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ClienteModule],
    })
      .overrideProvider(ClienteService)
      .useValue(clienteService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/POST clientes/criar (criação de cliente)', () => {
    return request(app.getHttpServer())
      .post('/clientes/criar')
      .send({ id: 1, nome: 'Beatriz' })
      .expect(201)
      .expect({
        message: 'Cliente Beatriz criado com sucesso.',
      });
  });

  it('/GET clientes/:id (obter cliente)', async () => {
    const response=await  request(app.getHttpServer())
      .get('/clientes/1')
      .expect(200)
      response.body.id = Number(response.body.id);

expect(clienteService.obterCliente(1));
  });

  afterAll(async () => {
    await app.close();
  });
});
