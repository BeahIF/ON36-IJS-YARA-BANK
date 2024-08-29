import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1724887057449 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
        await queryRunner.query(`CREATE TABLE contas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero_conta VARCHAR(20) UNIQUE NOT NULL,
    tipo_conta VARCHAR(50),
    saldo DECIMAL(15, 2) DEFAULT 0.00,
    cliente_id UUID NOT NULL,
    gerente_id UUID NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    CONSTRAINT fk_gerente FOREIGN KEY (gerente_id) REFERENCES gerente(id) ON DELETE CASCADE
);`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS contas;`);

    }

}
