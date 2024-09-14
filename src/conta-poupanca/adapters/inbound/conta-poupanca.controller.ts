import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { ContaPoupancaService } from '../../application/conta-poupanca.service';
import { ContaPoupanca } from '../../../conta.model';
import { GerenteService } from '../../../gerente/application/gerente.service';
import { ClienteService } from 'src/cliente/application/cliente.service';
import { Cliente } from 'src/cliente/adapters/outbound/cliente.model';

@Controller('conta-poupanca')
export class ContaPoupancaController {
  constructor(
    private readonly contaPoupancaService: ContaPoupancaService,
    private readonly clienteService: ClienteService,
    private readonly gerenteService: GerenteService,
  ) {}
  @Post('/criar')
  async criarContaPoupanca(
    @Body()
    contaDto: {
      numeroConta: number;
      saldo: number;
      taxaJuros: number;
      clienteId: number;
      gerenteId: number;
    },
  ) {
    const cliente = await this.clienteService.obterCliente(contaDto.clienteId);
    const gerente =  await this.gerenteService.obterGerente(contaDto.gerenteId);

    if (!cliente) {
      return { message: 'Cliente não encontrado' };
    }

    if (!gerente) {
      return { message: 'Gerente não encontrado' };
    }

    const conta = new ContaPoupanca(
      contaDto.numeroConta,
      contaDto.saldo,
      contaDto.taxaJuros,
      cliente as unknown as Cliente,
      gerente,
    );
    this.contaPoupancaService.criarConta(conta);
    return {
      message: `Conta Poupança ${conta.numeroConta} criada com sucesso.`,
    };
  }

  @Get('/:numeroConta')
  obterConta(@Param('numeroConta') numeroConta: number) {
    const conta = this.contaPoupancaService.obterConta(numeroConta);
    if (!conta) {
      return { message: 'Conta não encontrada' };
    }
    return conta;
  }

  @Put('/:numeroConta/depositar')
  depositar(
    @Param('numeroConta') numeroConta: number,
    @Body('valor') valor: number,
  ) {
    this.contaPoupancaService.depositar(numeroConta, valor);
    return { message: 'Depósito realizado com sucesso' };
  }

  @Put('/:numeroConta/sacar')
  sacar(
    @Param('numeroConta') numeroConta: number,
    @Body('valor') valor: number,
  ) {
    const sucesso = this.contaPoupancaService.sacar(numeroConta, valor);
    if (sucesso) {
      return { message: 'Saque realizado com sucesso' };
    } else {
      return { message: 'Saldo insuficiente' };
    }
  }

  @Put('/:numeroConta/transferir')
  transferir(
    @Body()
    transferencia: {
      numeroContaOrigem: number;
      numeroContaDestino: number;
      valor: number;
    },
  ) {
    const sucesso = this.contaPoupancaService.transferir(
      transferencia.numeroContaOrigem,
      transferencia.numeroContaDestino,
      transferencia.valor,
    );
    if (sucesso) {
      return { message: 'Transferência realizada com sucesso' };
    } else {
      return { message: 'Falha na transferência' };
    }
  }
}
