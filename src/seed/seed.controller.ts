import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';


@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}


  @Get()
  executeSeed() {
    return this.seedService.executeSeed();
  }

  //El objectivo del controllador es escuchar las solicitudes y dar respuesta, no deberia de generar logica de negocio
  //para eso son los servicios.
}
