const express = require('express');
const CategoriesService = require ('./../Services/CategoriesService');
const validatorHandler = require('../Middlewares/ValidatorHandler');
const {createCategorySchema, updateCategorySchema, getCategorySchema} = require('../Schema/CategoriesSchema');
const router = express.Router();
const service = new CategoriesService();

router.get ('/', async (request, response) => {
  const categories = await service.find();
  response.json(categories);
});

// router.get('/:id/products/:productId', async (request, response) => {
//   const {id, productId} = request.params;
//     response.json({
//     id,
//     productId,
//   });
// })

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (request, response, next)=>{
    try {
      const {id} = request.params;
      const category = await service.findOne(id);
      response.status(200).json(category);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const newCategory = await service.create(body);
    response.status(201).json(newCategory);
});

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async ( request, response, next ) => {
  try {
    const {id} = request.params;
    const body = request.body;
    const category = await service.update(id, body);
    response.json(category);
  } catch ( error ) {
    next(error);
  }
});

router.put('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (request, response, next) => {
  try {
    const {id} = request.params;
    const body = request.body;
    const category = await service.update(id, body);
    response.json(category);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (request, response, next) => {
    try {
      const {id } = request.params
      const delCategory = await service.delete(id)
      response.json(delCategory);
    } catch (error) {
      next(error);
    }
});

module.exports = router;

