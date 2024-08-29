import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ContaEntity } from './conta.entity';

@Entity('gerente')
export class GerenteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    nome: string;

    @OneToMany(() => ContaEntity, conta => conta.gerente)
    contas: ContaEntity[];
}
