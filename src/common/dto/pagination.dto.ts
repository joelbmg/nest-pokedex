import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class paginationDto {

    @IsOptional() //Parametros del query - El parametro es opcional
    @IsPositive() //Debe ser un numero positivo, es decir no puede ser negativo ex: -1
    @IsNumber() // Especifica que es de tipo numerico
    @Min(1)  //Debe tener al menor 1 datos la consulta
    limit?: number;  //When you put this (?) after the variable it meanst that this optional

    @IsOptional()
    @IsNumber()
    @IsPositive() //Debe ser un numbero positivo
    offset?: number; //When you put this (?) after the variable it meanst that this optional

}