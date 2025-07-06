<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. clonar el repositorio.
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
yarn add @nestjs/cli -g
```
4. Levantar la base de datos.
```
docker-compose up -d
```

5. Levantar el servidor en nest - modo desarrollo.
  ```
   yarn start:dev
  ```

6. Rescontruit la base de datos con la semilla.
```
  http://localhost:3000/api/v2/seed
```
7. Clonar el archivo __.env.templete__ y renombrar la copia __.env__

8. Llenar las variables de entorno definidas en el ```env```

## Stack usado
* MongoDB
* Nest
* Docker



