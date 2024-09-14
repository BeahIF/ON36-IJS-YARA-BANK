import { GerenteEntity } from '../../db/entities/gerente.entity';
import { GerenteORMRepository } from '../repository/orm/gerenteORM.repository';
import { GerenteService } from './gerente.service';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

describe('GerenteService', () => {
  let service: GerenteService;
  let repository: GerenteORMRepository

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findOne: jest.fn(),
    } as unknown as GerenteORMRepository;
    service = new GerenteService(repository);
  });

  it('deve adicionar um gerente', async () => {
    const gerente = {id:uuid(), nome: 'Carlos' };
    const gerenteSalvo = { ...gerente, id: uuid(), contas: [] } as GerenteEntity;

    // Mock do método save do GerenteRepository
    jest.spyOn(repository, 'save').mockResolvedValue(gerenteSalvo);

    const result = await service.adicionarGerente(gerente);

    expect(repository.save).toHaveBeenCalledWith({
      nome: 'Carlos',
      id: expect.any(String),  // Verifica se um UUID é gerado
      contas: [],
    });
    expect(result).toEqual(gerenteSalvo);
  });

  it('deve obter um gerente pelo ID', async () => {
    const gerenteEncontrado = { nome: 'Carlos', id: 1, contas: [] } as unknown as GerenteEntity;

    // Mock do método findOne do GerenteRepository
    jest.spyOn(repository, 'findOne').mockResolvedValue(gerenteEncontrado);

    const result = await service.obterGerente(1);

    expect(repository.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(gerenteEncontrado);
  });

  it('deve lançar um erro ao tentar obter um gerente inexistente', async () => {
    // Mock para o caso de gerente não encontrado
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.obterGerente(999)).rejects.toThrow(NotFoundException);
    expect(repository.findOne).toHaveBeenCalledWith(999);
  });
});