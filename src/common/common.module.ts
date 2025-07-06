import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
    providers: [AxiosAdapter],
    exports: [ AxiosAdapter ] //Para que sea visible en otros modulos.
})
export class CommonModule {}
