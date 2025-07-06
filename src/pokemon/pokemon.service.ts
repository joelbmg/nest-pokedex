import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { paginationDto } from 'src/common/dto/pagination.dto';



@Injectable()
export class PokemonService {

  private defaultLimit: number;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly PokemonModel: Model<Pokemon>,

    private readonly configService: ConfigService
  ) {
     // console.log(process.env.DEFAULT_LIMIT);
     // console.log( configService.getOrThrow('jwt-seed') )
    this.defaultLimit = configService.get<number>('defaultLimit'); //En esta session no estoy utilizando "this." porque estoy dentro del constructor, si estoy fuera tengo que usarlo.
    // console.log({defaultLimit}
  }


  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {

       const Pokemon = await this.PokemonModel.create( createPokemonDto );
    
        return Pokemon;
      
    } catch (error) {
      this.handleExceptions( error );
    }
   
    
  }
  //Return all pokemon
  findAll( paginationDto: paginationDto ) {

  const { limit = this.defaultLimit, offset = 0  } = paginationDto; //Here we use the distructurion of JavaScript

    return this.PokemonModel.find()
    .limit( limit ) //Que solo me traiga 5
    .skip( offset ) //Que se salte los primeros 5
    .sort({
      no: 1   //Ordenar por el numero de forma acendente
    })
    .select('-__v') //Para no ver la columna ( v ) version
  }

 async findOne(term: string) {
    
    let Pokemon: Pokemon;

      if ( !isNaN(+term) ) {                                       
          Pokemon = await this.PokemonModel.findOne({ no: term });
       }

    // // MongoID
      if ( !Pokemon && isValidObjectId( term ) ) {
         Pokemon = await this.PokemonModel.findById( term );
      }

    // // Name
     if ( !Pokemon ) {
       Pokemon = await this.PokemonModel.findOne({ name: term.toLowerCase().trim() })
      }


     if ( !Pokemon ) 
       throw new NotFoundException(`Pokemon with id, name or no "${ term }" not found`);

     //console.log({Pokemon});

    return Pokemon;

   

  }
  

  async update( term: string, updatePokemonDto: UpdatePokemonDto ) {

    const pokemon = await this.findOne( term );

      if( pokemon.name ) {
        pokemon.name = pokemon.name.toLowerCase();
     }

     try {
        await pokemon.updateOne( updatePokemonDto );
        return { ...pokemon.toJSON(), ...updatePokemonDto };
      
     } catch (error) {
      
      this.handleExceptions(error);
      
     }

    
    
     //console.log( { pokemon } )

    

    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }


  async remove(id: string) {
    //  const pokemon = await this.findOne( id );
    //  ///this.PokemonModel.findByIdAndDelete( id )
    //  await pokemon.deleteOne();
    const { deletedCount } = await this.PokemonModel.deleteOne({_id: id  });
    if ( deletedCount === 0 )
      throw new BadRequestException(`Pokemon with id "${ id }" not found`);

    return;
  }


  //Crear un metodo en mi servicios para el manejo de errores.
   private handleExceptions( error: any ) {
       if( error.code === 11000) {
        throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify( error.keyValue )}`);
      }
      console.log(error)
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
   }

}
