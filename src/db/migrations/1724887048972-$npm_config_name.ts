import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1724887048972 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
        await queryRunner.query('CREATE TABLE gerente(id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),nome varchar(100) NOT NULL)')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS gerente;`);

    }

}
