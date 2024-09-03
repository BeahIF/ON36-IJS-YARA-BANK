import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ClienteEntity } from './cliente.entity';
import { GerenteEntity } from './gerente.entity';

@Entity('contas')
export class ContaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 20, unique: true })
    numero_conta: string;

    @Column({ type: 'varchar', length: 50 })
    tipo_conta: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0.00 })
    saldo: number;

    @Column({ type: 'uuid' })
    cliente_id: string;

    @ManyToOne(() => ClienteEntity, (cliente) => cliente.contas, { onDelete: 'CASCADE' })
    cliente: ClienteEntity;
    
    @Column({ type: 'uuid' })
    gerente_id: string;

    @ManyToOne(() => GerenteEntity, gerente => gerente.contas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'gerente_id' })
    gerente: GerenteEntity;
}
