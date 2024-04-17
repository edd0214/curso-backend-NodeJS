
const express = require('express');
const ProductsService = require ('../Services/ProductsServices');
const validatorHandler = require('../Middlewares/ValidatorHandler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('../Schema/ProductSchema');

/*Se va a crear el acceso a express mediante un
router específico para products*/
const router = express.Router();
const service = new ProductsService();

router.get('/', async (request, response) => {
  const products = await service.find();
  response.json(products);
});

// router.get('/filter', (request, response) => {
//   response.status(200).send('Uso de un filter...');
// });

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (request, response, next) => {
    try {
      const {id} = request.params;
      const product = await service.findOne(id);
      response.json(product);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const newProduct = await service.create(body);
    response.status(201).json(newProduct);
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (request, response, next) => {

    try {
      const {id} = request.params;
      const body = request.body;
      const product = await service.update(id, body);
      response.json(product);
    } catch (error) {
      next(error);
    }
})

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (request, response, next) => {
    try {
      const {id} = request.params;
      const body = request.body;
      const product = await service.update(id, body);
      response.json(product);
    } catch (error) {
      next(error);
    }
});

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (request, response, next) => {
    try {
      const {id} = request.params;
      const delProduct = await service.delete(id);
      response.json(delProduct);
    } catch (error) {
      next(error);
    }
})

module.exports = router;
/*
A cada uno de los endpoints
les falta añadir una validación que pueda devolver
el tipo de Http response status code.
En clase optan por dar un número fijo para determinar el
codigo de respuesta 404, pero es mejor determinar un ID
fijo para que la respuesta sea adecuada.

*/
