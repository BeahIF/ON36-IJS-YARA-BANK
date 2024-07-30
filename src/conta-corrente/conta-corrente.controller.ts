// src/conta-Corrente/conta-Corrente.controller.ts

import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { ContaCorrente } from '../conta.model';
import { ContaCorrenteService } from './conta-corrente.service';

@Controller('conta-corrente')
export class ContaCorrenteController {
  constructor(private readonly contaCorrenteService: ContaCorrenteService) {}

  @Post('/criar')
  criarConta(
    @Body() contaDto: { numeroConta: number; limiteChequeEspecial: number },
  ) {
    const conta = new ContaCorrente(
      contaDto.numeroConta,
      contaDto.limiteChequeEspecial,
    );

    this.contaCorrenteService.criarConta(conta as ContaCorrente);
    return { message: 'Conta criada com sucesso' };
  }

  @Get('/:numeroConta')
  obterConta(@Param('numeroConta') numeroConta: number) {
    const conta = this.contaCorrenteService.obterConta(numeroConta);
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
    this.contaCorrenteService.depositar(numeroConta, valor);
    return { message: 'Depósito realizado com sucesso' };
  }

  @Put('/:numeroConta/sacar')
  sacar(
    @Param('numeroConta') numeroConta: number,
    @Body('valor') valor: number,
  ) {
    const sucesso = this.contaCorrenteService.sacar(numeroConta, valor);
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
    const sucesso = this.contaCorrenteService.transferir(
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
