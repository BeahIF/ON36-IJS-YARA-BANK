import { DataSource } from 'typeorm'
import { ClienteEntity } from './db/entities/cliente.entity';
import { ContaEntity } from './db/entities/conta.entity';
import { GerenteEntity } from './db/entities/gerente.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', // substitua pelos detalhes do seu banco de dados
  port: 5432,
  username: 'postgres',
  password: 'Be@triz1',
  database: 'postgres',
  entities: [ClienteEntity, ContaEntity, GerenteEntity],
});

async function testConnection() {
  try {
    await dataSource.initialize();
    console.log('Database connection is successful');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await dataSource.destroy(); // Fecha a conexão quando o teste estiver completo
  }
}

testConnection();
