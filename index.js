const express = require('express'); //importamos express

const cors = require('cors');

const routerApi = require('./routes'); //importamos la función routerApi de la carpeta ./routes

const {logErrors, errorHandler, boomErrorHandler} = require ('./Middlewares/MiddlewareErrorHandler');

/*Express como constructor nos permite crear una app*/
const app = express();

const port = process.env.PORT || 3010; //determinamos el puerto al que se va a acceder

app.use(express.json());

const whiteList= [ //orígenes desde los que se pueden recibir peticiones.
  'http://127.0.0.1:5500',
  'http://localhost:8080',
  'http://localhost:3010',
];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback( new Error ('No permitido'));
    }
  }
}


app.use(cors(options)); //Habilitamos cualquier dominio/origen.

/*Definimos una ruta, en la cual se declara un callback,
que dará respuesta a las peticiones del cliente*/
app.get('/', (request, response) => {
  response.send('Éste es un server hecho con Express.js');
});

app.get('/ruta-nueva', (request, response) => {
  response.send('Ésta es una nueva ruta o endpoint');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

/*Indicamos a la app el puerto específico desde el cual va a escuchar*/
app.listen(port, () => {
  console.log(`El puerto por el que se accede es el ${port}`);
});
