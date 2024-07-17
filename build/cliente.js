"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    constructor(id, nomeCompleto, endereco, telefone) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.endereco = endereco;
        this.telefone = telefone;
        this.contas = [];
    }
}
exports.Cliente = Cliente;
