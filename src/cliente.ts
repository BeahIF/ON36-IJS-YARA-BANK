import { IContaBancaria } from "./conta";

interface ICliente {
    id: number;
    nomeCompleto: string;
    endereco: string;
    telefone: string;
    contas: IContaBancaria[];

}

export class Cliente implements ICliente {
    contas: IContaBancaria[] = [];

    constructor(
        public id: number,
        public nomeCompleto: string,
        public endereco: string,
        public telefone: string
    ) {}
}