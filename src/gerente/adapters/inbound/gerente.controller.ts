import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GerenteService } from 'src/gerente/application/gerente.service';
import { Gerente } from '../outbound/gerente.model';


@Controller('gerentes')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post('/criar')
  criarGerente(@Body() gerenteDto: { id: number; nome: string }) {
    const gerente = new Gerente(gerenteDto.id, gerenteDto.nome);
    this.gerenteService.adicionarGerente(gerente);
    return { message: `Gerente ${gerente.nome} criado com sucesso.` };
  }

  @Get('/:id')
  obterGerente(@Param('id') id: number) {
    const gerente = this.gerenteService.obterGerente(id);
    return gerente;
  }
}
