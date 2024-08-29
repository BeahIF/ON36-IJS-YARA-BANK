import { ClienteEntity } from "src/db/entities/cliente.entity";
import { Cliente } from "../adapters/outbound/cliente.model";

export abstract class ClienteRepository {
    abstract save(cliente:ClienteEntity)
    abstract findOne(id:number):Promise<Cliente|ClienteEntity>
}