import { Injectable } from "@nestjs/common";
import { GerenteRepository } from "../gerente.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { GerenteEntity } from "../../../db/entities/gerente.entity";
import { Repository } from "typeorm";
import { Gerente } from "../../adapters/outbound/gerente.model";

@Injectable()
export class GerenteORMRepository implements GerenteRepository{
    constructor(
        @InjectRepository(GerenteEntity)
      private gerenteRepository: Repository<GerenteEntity>
      ){}
    
    async save(gerente:GerenteEntity){
        return this.gerenteRepository.save(gerente);
      }
    
    async findOne(id: number): Promise<Gerente | GerenteEntity> {
        return this.gerenteRepository.findOne({ where: { id:id as unknown as string } });
    }
}