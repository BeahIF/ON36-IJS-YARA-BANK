import { IContaBancaria } from 'src/conta.model';

export class Cliente {
  constructor(
    public id: number,
    public nome: string,
    public contas: IContaBancaria[] = [],
  ) {}
}
