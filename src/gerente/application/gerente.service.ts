import { Injectable, NotFoundException } from '@nestjs/common';
import { Gerente } from '../adapters/outbound/gerente.model';
import { GerenteRepository } from '../repository/gerente.repository';
import { GerenteEntity } from '../../db/entities/gerente.entity';
import{v4 as uuid} from 'uuid'

@Injectable()
export class GerenteService {
  constructor(private readonly gerenteRepository: GerenteRepository){}

  async adicionarGerente(gerente: Gerente): Promise<Gerente> {
    const gerenteToSave: GerenteEntity = {
      nome: gerente.nome,
      id: uuid(),
      contas: []
    }

    const createdGerente = await this.gerenteRepository.save(gerenteToSave);
    return createdGerente
  }

  async obterGerente(id: number): Promise<Gerente> {
    const gerente = await this.gerenteRepository.findOne(id);
    if (!gerente) {
      throw new NotFoundException('Gerente não encontrado');
    }
    return gerente;
  }

}
