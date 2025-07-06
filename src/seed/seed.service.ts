import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

   //private readonly axios: AxiosInstance = axios;

   constructor(
    @InjectModel( Pokemon.name )
       private readonly PokemonModel: Model<Pokemon>,

       private readonly http: AxiosAdapter
      ) {}

 async executeSeed() {

  //#region : Mi codigo de insercion por lotes en mongodb - Una forma
  //  await this.PokemonModel.deleteMany({}); ///delete * from pokemon

  //  const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650'); 
  //  //Le agrego el "PokeResponse" para tener como un generico para tener acceso a mi data.

  //    const insertPromiseArray = [];

  //    data.results.forEach(({name, url}) => {
  //      //console.log({name, url});

  //      const segments = url.split('/');
  //      const no:number = +segments[ segments.length - 2 ];

  //     // const Pokemon = await this.PokemonModel.create({ name, no } );
  //     // console.log({ name, no });

  //     //2nd way to do the multiple insertion at once
  //     insertPromiseArray.push(
  //       this.PokemonModel.create({ name, no } )
  //     );

  //    });
    
  //    await Promise.all( insertPromiseArray );

  //   //const newArray = await Promise.all( insertPromiseArray );

  //  // console.log({ newArray });

  //   return 'Seed Executed';
   //#region 
   await this.PokemonModel.deleteMany({})

   const  data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

       const pokemonToInsert: { name: string, no: number }[] = [];

        data.results.forEach(({name, url}) => {
        //console.log({name, url});

         const segments = url.split('/');
         const no:number = +segments[ segments.length - 2 ];

       // const Pokemon = await this.PokemonModel.create({ name, no } );
       // console.log({ name, no });

       //2nd way to do the multiple insertion at once
        pokemonToInsert.push({ name, no } ); //Aqui hay un arreglo. 
        // insert into pokemons (name, no) = in my sql.
     

      });
    
     await this.PokemonModel.insertMany( pokemonToInsert );

     //const newArray = await Promise.all( insertPromiseArray );

     // console.log({ newArray });

     return 'Seed Executed';




  }
  
}
