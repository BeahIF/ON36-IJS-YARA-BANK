import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ContaEntity } from './entities/conta.entity';
import { ClienteEntity } from './entities/cliente.entity';
import { GerenteEntity } from './entities/gerente.entity';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [ContaEntity, ClienteEntity, GerenteEntity],
  migrations: [__dirname + '/migrations/*.ts'],
};

export default new DataSource(dataSourceOptions);