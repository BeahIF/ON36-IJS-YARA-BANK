import { IContaBancaria } from 'src/conta.model';

export class Cliente {
  constructor(
    public id: number,
    public nome: string,
    public contas: IContaBancaria[] = [],
  ) {}

  adicionarConta(conta: IContaBancaria): void {
    this.contas.push(conta);
  }

  removerConta(numeroConta: number): boolean {
    const index = this.contas.findIndex(
      (conta) => conta.numeroConta === numeroConta,
    );
    if (index !== -1) {
      this.contas.splice(index, 1);
      return true;
    }
    return false;
  }
}
