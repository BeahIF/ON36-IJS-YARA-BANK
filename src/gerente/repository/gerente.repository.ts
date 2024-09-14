import { GerenteEntity } from "../../db/entities/gerente.entity";
import { Gerente } from "../adapters/outbound/gerente.model";

export abstract class GerenteRepository {
    abstract save(gerente:GerenteEntity)
    abstract findOne(id:number):Promise<Gerente|GerenteEntity>
}