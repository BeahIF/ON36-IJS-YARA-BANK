import { Test, TestingModule } from '@nestjs/testing';
import { GerenteService } from './application/gerente.service';
import { GerenteController } from './adapters/inbound/gerente.controller';
import { Gerente } from './adapters/outbound/gerente.model';

describe('GerenteController', () => {
  let controller: GerenteController;
  let service: GerenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GerenteController],
      providers: [GerenteService],
    }).compile();

    controller = module.get<GerenteController>(GerenteController);
    service = module.get<GerenteService>(GerenteService);
  });

  it('deve criar um gerente', () => {
    const gerenteDto = { id: 1, nome: 'Carlos' };
    const gerente = new Gerente(gerenteDto.id, gerenteDto.nome);

    jest.spyOn(service, 'adicionarGerente').mockReturnValue(gerente);

    const result = controller.criarGerente(gerenteDto);
    expect(result).toEqual({ message: `Gerente ${gerente.nome} criado com sucesso.` });
    expect(service.adicionarGerente).toHaveBeenCalledWith(gerente);
  });

  it('deve obter um gerente pelo ID', () => {
    const gerente = new Gerente(1, 'Carlos');
    jest.spyOn(service, 'obterGerente').mockReturnValue(gerente);

    const result = controller.obterGerente(1);
    expect(result).toBe(gerente);
    expect(service.obterGerente).toHaveBeenCalledWith(1);
  });
});
