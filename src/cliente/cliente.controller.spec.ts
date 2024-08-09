import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';

describe('ClienteController', () => {
  let controller: ClienteController;
  let service: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [ClienteService],
    }).compile();

    controller = module.get<ClienteController>(ClienteController);
    service = module.get<ClienteService>(ClienteService);
  });

  it('deve criar um cliente', () => {
    const clienteDto = { id: 1, nome: 'Beatriz' };
    const cliente = new Cliente(clienteDto.id, clienteDto.nome);

    jest.spyOn(service, 'adicionarCliente').mockReturnValue(cliente);

    const result = controller.criarCliente(clienteDto);
    expect(result).toEqual({ message: `Cliente ${cliente.nome} criado com sucesso.` });
    expect(service.adicionarCliente).toHaveBeenCalledWith(cliente);
  });

  it('deve obter um cliente pelo ID', () => {
    const cliente = new Cliente(1, 'Beatriz');
    jest.spyOn(service, 'obterCliente').mockReturnValue(cliente);

    const result = controller.obterCliente(1);
    expect(result).toBe(cliente);
    expect(service.obterCliente).toHaveBeenCalledWith(1);
  });
});
