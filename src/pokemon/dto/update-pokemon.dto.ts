import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {} ///Esto esta heredando gracias al partial type
