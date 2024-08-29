import { Test, TestingModule } from '@nestjs/testing';
import { ContaCorrenteController } from './conta-corrente.controller';
import { ContaCorrenteService } from '../../applications/conta-corrente.service';
import { GerenteService } from '../../../gerente/application/gerente.service';
import { ContaCorrente } from '../../../conta.model';
import { Cliente } from '../../../cliente/adapters/outbound/cliente.model';
import { ClienteService } from 'src/cliente/application/cliente.service';
import { Gerente } from 'src/gerente/adapters/outbound/gerente.model';

describe('ContaCorrenteController', () => {
  let controller: ContaCorrenteController;
  let service: ContaCorrenteService;
  let clienteService: ClienteService;
  let gerenteService: GerenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContaCorrenteController],
      providers: [
        ContaCorrenteService,
        ClienteService,
        GerenteService,
      ],
    }).compile();

    controller = module.get<ContaCorrenteController>(ContaCorrenteController);
    service = module.get<ContaCorrenteService>(ContaCorrenteService);
    clienteService = module.get<ClienteService>(ClienteService);
    gerenteService = module.get<GerenteService>(GerenteService);
  });

  it('deve criar uma conta corrente', () => {
    const cliente = new Cliente(1, 'Beatriz');
    const gerente = new Gerente(1, 'Carlos');
    const contaDto = {
      numeroConta: 123,
      limiteChequeEspecial: 500,
      clienteId: 1,
      gerenteId: 1,
    };

    jest.spyOn(clienteService, 'obterCliente').mockResolvedValue(cliente);
    jest.spyOn(gerenteService, 'obterGerente').mockReturnValue(gerente);
    jest.spyOn(service, 'criarConta').mockImplementation(() => {});

    const result = controller.criarConta(contaDto);
    expect(result).toEqual({ message: 'Conta criada com sucesso' });
    expect(clienteService.obterCliente).toHaveBeenCalledWith(contaDto.clienteId);
    expect(gerenteService.obterGerente).toHaveBeenCalledWith(contaDto.gerenteId);
    expect(service.criarConta).toHaveBeenCalledWith(expect.any(ContaCorrente));
  });

  it('deve obter uma conta corrente pelo número', () => {
    const conta = new ContaCorrente(123, 500, new Cliente(1, 'Beatriz'), new Gerente(1, 'Carlos'));
    jest.spyOn(service, 'obterConta').mockReturnValue(conta);

    const result = controller.obterConta(123);
    expect(result).toBe(conta);
    expect(service.obterConta).toHaveBeenCalledWith(123);
  });

  it('deve realizar um depósito', () => {
    const conta = new ContaCorrente(123, 500, new Cliente(1, 'Beatriz'), new Gerente(1, 'Carlos'));
    jest.spyOn(service, 'obterConta').mockReturnValue(conta);
    jest.spyOn(service, 'depositar').mockImplementation(() => {});

    const result = controller.depositar(123, 100);
    expect(result).toEqual({ message: 'Depósito realizado com sucesso' });
    expect(service.depositar).toHaveBeenCalledWith(123, 100);
  });

  it('deve realizar um saque', () => {
    const conta = new ContaCorrente(123, 500, new Cliente(1, 'Beatriz'), new Gerente(1, 'Carlos'));
    jest.spyOn(service, 'obterConta').mockReturnValue(conta);
    // jest.spyOn(service, 'sacar').mockReturnValue(true);

    const result = controller.sacar(123, 100);
    expect(result).toEqual({ message: 'Saque realizado com sucesso' });
    expect(service.sacar).toHaveBeenCalledWith(123, 100);
  });

  it('deve realizar uma transferência', () => {
    const contaOrigem = new ContaCorrente(123, 500, new Cliente(1, 'Beatriz'), new Gerente(1, 'Carlos'));
    const contaDestino = new ContaCorrente(456, 1000, new Cliente(2, 'Ana'), new Gerente(1, 'Carlos'));
    jest.spyOn(service, 'obterConta').mockImplementation((numeroConta) => 
      numeroConta === 123 ? contaOrigem : contaDestino
    );
    jest.spyOn(service, 'transferir').mockReturnValue(true);

    const result = controller.transferir({
      numeroContaOrigem: 123,
      numeroContaDestino: 456,
      valor: 200,
    });
    expect(result).toEqual({ message: 'Transferência realizada com sucesso' });
    expect(service.transferir).toHaveBeenCalledWith(123, 456, 200);
  });
});
