import { Injectable } from "@nestjs/common";
import { ClienteRepository } from "../cliente.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { ClienteEntity } from "../../../db/entities/cliente.entity";
import { Repository } from "typeorm";
import { Cliente } from "../../adapters/outbound/cliente.model";

@Injectable()
export class ClienteORMRepository implements ClienteRepository{
    constructor(
        @InjectRepository(ClienteEntity)
      private clienteRepository: Repository<ClienteEntity>
      ){}
    
    async save(cliente:ClienteEntity){
        return this.clienteRepository.save(cliente);
      }
    
    async findOne(id: number): Promise<Cliente | ClienteEntity> {
        return this.clienteRepository.findOne({ where: { id:id as unknown as string } });
    }
}