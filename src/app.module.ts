import { join } from 'path'; // en node - all the package from node go first
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';



@Module({
  imports: [

    ConfigModule.forRoot({
       load: [ EnvConfiguration ], //ESTE HACE CONVERSIONES Y MAPPEO
       validationSchema: JoiValidationSchema //ESTA HACE VALIDATION CON LA LIBRERIA **Joi**
    }), //This need to be read before the variable of the entorno if not we will have an issue.
    
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, '..','public'),
    }),


    MongooseModule.forRoot( process.env.MONGODB, {
       dbName: 'pokemonsdb' 
    } ),

    PokemonModule,

    CommonModule,

    SeedModule,

    
  ],
})
export class AppModule {}
