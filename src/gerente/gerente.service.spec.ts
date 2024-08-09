import { GerenteService } from './gerente.service';
import { Gerente } from './gerente.model';
import { NotFoundException } from '@nestjs/common';

describe('GerenteService', () => {
  let service: GerenteService;

  beforeEach(() => {
    service = new GerenteService();
  });

  it('deve adicionar um gerente', () => {
    const gerente = new Gerente(1, 'Carlos');
    service.adicionarGerente(gerente);

    expect(service['gerentes'].length).toBe(1);
    expect(service['gerentes'][0]).toBe(gerente);
  });

  it('deve obter um gerente pelo ID', () => {
    const gerente = new Gerente(1, 'Carlos');
    service.adicionarGerente(gerente);

    const gerenteEncontrado = service.obterGerente(1);
    expect(gerenteEncontrado).toBe(gerente);
  });

  it('deve lançar um erro ao tentar obter um gerente inexistente', () => {
    expect(() => service.obterGerente(999)).toThrow(NotFoundException);
  });
});
