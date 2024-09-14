import { Test, TestingModule } from '@nestjs/testing';
import { ContaPoupancaController } from './conta-poupanca.controller';
import { ContaPoupancaService } from '../../application/conta-poupanca.service';
import { GerenteService } from '../../../gerente/application/gerente.service';
import { ContaPoupanca } from '../../../conta.model';
import { Cliente } from '../../../cliente/adapters/outbound/cliente.model';
import { ClienteService } from 'src/cliente/application/cliente.service';
import { Gerente } from 'src/gerente/adapters/outbound/gerente.model';

describe('ContaPoupancaController', () => {
  let controller: ContaPoupancaController;
  let service: ContaPoupancaService;
  let clienteService: ClienteService;
  let gerenteService: GerenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContaPoupancaController],
      providers: [
        ContaPoupancaService,
        ClienteService,
        GerenteService,
      ],
    }).compile();

    controller = module.get<ContaPoupancaController>(ContaPoupancaController);
    service = module.get<ContaPoupancaService>(ContaPoupancaService);
    clienteService = module.get<ClienteService>(ClienteService);
    gerenteService = module.get<GerenteService>(GerenteService);
  });

  it('deve criar uma conta poupança', () => {
    const cliente = new Cliente(1, 'Beatriz');
    const gerente = new Gerente('1', 'Carlos');
    const contaDto = {
      numeroConta: 123,
      saldo: 1000,
      taxaJuros: 0.05,
      clienteId: 1,
      gerenteId: 1,
    };

    jest.spyOn(clienteService, 'obterCliente').mockResolvedValue(cliente);
    jest.spyOn(gerenteService, 'obterGerente').mockResolvedValueOnce(gerente);
    jest.spyOn(service, 'criarConta').mockImplementation(() => {});

    const result = controller.criarContaPoupanca(contaDto);
    expect(result).toEqual({
      message: `Conta Poupança ${contaDto.numeroConta} criada com sucesso.`,
    });
    expect(clienteService.obterCliente).toHaveBeenCalledWith(contaDto.clienteId);
    expect(gerenteService.obterGerente).toHaveBeenCalledWith(contaDto.gerenteId);
    expect(service.criarConta).toHaveBeenCalledWith(expect.any(ContaPoupanca));
  });

  it('deve obter uma conta poupança pelo número', () => {
    const conta = new ContaPoupanca(123, 1000, 0.05, new Cliente(1, 'Beatriz'), new Gerente('1', 'Carlos'));
    jest.spyOn(service, 'obterConta').mockReturnValue(conta);

    const result = controller.obterConta(123);
    expect(result).toBe(conta);
    expect(service.obterConta).toHaveBeenCalledWith(123);
  });

  it('deve realizar um depósito', () => {
    const conta = new ContaPoupanca(123, 1000, 0.05, new Cliente(1, 'Beatriz'), new Gerente('1', 'Carlos'));
    jest.spyOn(service, 'obterConta').mockReturnValue(conta);
    jest.spyOn(service, 'depositar').mockImplementation(() => {});

    const result = controller.depositar(123, 100);
    expect(result).toEqual({ message: 'Depósito realizado com sucesso' });
    expect(service.depositar).toHaveBeenCalledWith(123, 100);
  });

  it('deve realizar um saque', () => {
    const conta = new ContaPoupanca(123, 1000, 0.05, new Cliente(1, 'Beatriz'), new Gerente('1', 'Carlos'));
    jest.spyOn(service, 'obterConta').mockReturnValue(conta);
    jest.spyOn(service, 'sacar').mockReturnValue(true);

    const result = controller.sacar(123, 100);
    expect(result).toEqual({ message: 'Saque realizado com sucesso' });
    expect(service.sacar).toHaveBeenCalledWith(123, 100);
  });

  it('deve realizar uma transferência', () => {
    const contaOrigem = new ContaPoupanca(123, 1000, 0.05, new Cliente(1, 'Beatriz'), new Gerente('1', 'Carlos'));
    const contaDestino = new ContaPoupanca(456, 1000, 0.05, new Cliente(2, 'Ana'), new Gerente('1', 'Carlos'));
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
