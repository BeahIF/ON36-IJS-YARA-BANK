import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ContaEntity } from './conta.entity';

@Entity('cliente')
export class ClienteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    nome: string;

    @OneToMany(() => ContaEntity, (conta) => conta.cliente)
    contas: ContaEntity[];
}
