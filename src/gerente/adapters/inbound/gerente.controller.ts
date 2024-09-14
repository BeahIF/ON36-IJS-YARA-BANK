import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GerenteService } from 'src/gerente/application/gerente.service';
import { Gerente } from '../outbound/gerente.model';


@Controller('gerentes')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post('/criar')
  async criarGerente(@Body() gerenteDto: { nome: string }) {
    const gerente = new Gerente( gerenteDto.nome);
    const createdGerente = await this.gerenteService.adicionarGerente(gerente);
    console.log(createdGerente)
    return { message: `Gerente ${gerente.nome}, ${createdGerente.id} criado com sucesso.` };
  }

  @Get('/:id')
  obterGerente(@Param('id') id: number) {
    const gerente = this.gerenteService.obterGerente(id);
    return gerente;
  }
}
