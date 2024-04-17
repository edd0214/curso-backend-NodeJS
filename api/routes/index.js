
const express = require('express');

/*En este archivo vamos a importar todos los routers
de cada uno de los endpoints a emplear en el proyecto*/

const productsRoute = require ('./productsRoute');
const categoriesRoute = require ('./categoriesRoute');
const usersRoute = require ('./usersRoute');



function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRoute);
  router.use('/categories', categoriesRoute);
  router.use('/users', usersRoute);
}

module.exports = routerApi;


/*
En este archivo se importan todos los routers de cada uno
de los endpoints a emplear.
Adicional, se crea un route convencional base, que parte
de la ruta /api/v1 para el manejo de versiones
creando una constante route que determine el Router base
y desde la cual se comparte a los demás endpoints
*/
