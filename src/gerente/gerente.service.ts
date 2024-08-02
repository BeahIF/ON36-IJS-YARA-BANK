import { Injectable, NotFoundException } from '@nestjs/common';
import { Gerente } from './gerente.model';
@Injectable()
export class GerenteService {
  private gerentes: Gerente[] = [];

  adicionarGerente(gerente: Gerente): Gerente {
    this.gerentes.push(gerente);
    return gerente;
  }

  obterGerente(id: number): Gerente {
    console.log(this.gerentes)
    const gerente = this.gerentes.find((c) => Number(c.id) === Number(id));
    if (!gerente) {
      throw new NotFoundException('Gerente não encontrado');
    }
    return gerente;
  }

}
