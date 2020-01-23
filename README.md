# Test Mercado Libre - Buscar secuencia de ADN mutante

- ### Enunciado:
Magneto quiere reclutar la mayor cantidad de mutantes para poder luchar contra los X-Mens.
Te ha contratado a ti para que desarrolles un proyecto que detecte si un humano es mutante basándose en su secuencia de ADN.
Para eso te ha pedido crear un programa con un método o función con la siguiente firma:

##### boolean isMutant(String[] dna);

En donde recibirás como parámetro un array de Strings que representan cada fila de una tabla de (NxN) con la secuencia del ADN. Las letras de los Strings solo pueden ser: (A,T,C,G), las cuales representa cada base nitrogenada del ADN.

###### NO MUTANTE

| A | T | G | C | G | A |
|---|---|---|---|---|---|
| C | A | G | T | G | C |
| T | T | A | T | T | T |
| A | G | A | C | G | G |
| G | C | G | T | C | A |
| T | C | A | C | T | G |

###### MUTANTE

| A | T | G | C | G | A |
|---|---|---|---|---|---|
| C | A | G | T | G | C |
| T | T | A | T | G | T |
| A | G | A | A | G | G |
| C | C | C | C | T | A |
| T | C | A | C | T | G |

Sabrás si un humano es mutante, si encuentras más de una secuencia de cuatro letras iguales , de forma oblicua, horizontal o vertical.

Ejemplo (Caso mutante):

##### String[] dna = {"ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"};

En este caso el llamado a la función isMutant(dna) devuelve “true”.
Desarrolla el algoritmo de la manera más eficiente posible.

##### Desafíos:

### Nivel 1:

Programa (en cualquier lenguaje de programación) que cumpla con el método pedido por
Magneto.

### Nivel 2:

Crear una API REST, hostear esa API en un cloud computing libre (Google App Engine,
Amazon AWS, etc), crear el servicio “/mutant/” en donde se pueda detectar si un humano es
mutante enviando la secuencia de ADN mediante un HTTP POST con un Json el cual tenga el
siguiente formato:

```sh
POST → /mutant/
{
“dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}
```

En caso de verificar un mutante, debería devolver un HTTP 200-OK, en caso contrario un 403-Forbidden

### Nivel 3:

Anexar una base de datos, la cual guarde los ADN’s verificados con la API.
Solo 1 registro por ADN.
Exponer un servicio extra “/stats” que devuelva un Json con las estadísticas de las verificaciones de ADN: {“count_mutant_dna”:40, “count_human_dna”:100: “ratio”:0.4}
Tener en cuenta que la API puede recibir fluctuaciones agresivas de tráfico (Entre 100 y 1 millón de peticiones por segundo).
Test-Automáticos, Code coverage > 80%, Diagrama de Secuencia / Arquitectura del sistema.

## Características
##### Tecnología:
- Nodejs
- Expressjs
- MongoDB
- Mongoose
- typescript

##### Testing
- mocha
- chai
- supertest
- Istanbul (nyc)

## Requerimientos

- node >= 10
- npm >= 6
- mongodb >= 3.0
- typescript >= 3.0

## Instalación

- Clonar repositorio
- Instalar dependencias
    - npm install -g nodemon 
    - npm install -g ts-node 
    - npm install -g typescript 
    - npm install

## Desplegar API
### Development
Para iniciar la aplicación en modo desarrollo:

```
nodemon
```
Para iniciar en la aplicacion en producción::

Instalar pm2 y pm2-typescript:
```
npm install -g pm2
pm2 install typescript
```

Ejemplo para desplegar:
```
pm2 start ./src/index.ts -i 2 --no-daemon
```

El servicio Express escuchará las peticiones en http://localhost:3000/

### Testing y Cobertura de Código
Para ejecutar las pruebas: 
```bash
npm test
```

Ejecutar Code Coverage:
```bash
npm run coverage
```

El resultado se muestra en https://htmlpreview.github.io/?https://github.com/pld2005/isMutant/blob/master/coverage/lcov-report/index.html

## Configurar ambiente
En la carpeta raiz encontrará el archivo `.env`. Puede usar esa configuración o cambiarla según sea necesario.
Si desea agregar nuevas variables, debe agregarlas al objeto de configuracion e interface (Ver `src/config/index.ts`)


## Documentación de API 

Se utiliza Swagger para documentar la Api. disponible en: 
```bash
http://localhost:3000/docs
```
![Alt Text](https://i.ibb.co/b6SdyQV/gif1.gif)

## App skeleton
```
.
├── LICENSE
├── README.md
├── nodemon.json
├── package.json
├── src
│   ├── components
│   │   ├── Dna
│   │   │   ├── index.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── module.ts
│   │   │   ├── service.ts
│   │   │   └── validation.ts
│   │   ├── index.ts
│   │   └── validation.ts
│   ├── config
│   │   ├── connection
│   │   │   └── connection.ts
│   │   ├── env
│   │   │   └── index.ts
│   │   ├── error
│   │   │   ├── index.ts
│   │   │   └── sendHttpError.ts
│   │   ├── middleware
│   │   │   ├── middleware.ts
│   │   └── server
│   │       ├── index.ts
│   │       ├── server.ts
│   │       └── serverHandlers.ts
│   ├── routes
│   │     ├── DnaRouter.ts
│   │     └── index.ts
│   └── test
│         ├── api.js
│         └── index.js
├── swagger.json
├── swaggerDef.js
├── tsconfig.json
└── tslint.json
```

##### Instruciones para ejecutar Desafios:

## Nivel 1

Ejemplo de uso:
```sh
//importar modulo
import * as mutant from './components/Dna/module.ts';

//ADN
let body = {dna: ['AAAT','CCGG','AAAA','GGCC']};

//Verificar ADN
console.log(mutant.isMutant(body));
```

## Nivel 2

Endpoint API: 'http://localhost:3000/api/mutant'
Metodo: POST
Content-Type: application/json
Data: '{"dna": ["AAAT","CCGG","AAAA","GGCC"]}'

```sh
// desde terminal
curl --location --request POST 'http://localhost:3000/api/mutant' \
--header 'Content-Type: application/json' \
--data-raw '{"dna": ["AAAT","CCGG","AAAA","GGCC"]}'

//llamapa POST desde node
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://localhost:3000/api/mutant',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"dna":["AAAT","CCGG","AAAA","GGCC"]})

};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});

//desde Swagger

Ingresar a http://localhost:3000/docs

```
![Alt Text](https://i.ibb.co/LPhMqtn/mutant.gif)


## Nivel 3


Endpoint API: 'http://localhost:3000/api/stats'
Metodo: GET
Content-Type: application/json

```sh

// desde terminal

curl --location --request GET 'http://localhost:3000/api/stats' \
--header 'Content-Type: application/json'

// llamada GET dede node

var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://localhost:3000/api/stats',
  'headers': {
    'Content-Type': 'application/json'
  }
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});


//desde Swagger

Ingresar a http://localhost:3000/docs

```

![Alt Text](https://i.ibb.co/Xp3Rkgp/stats.gif)
