const express = require('express');
const UsersService = require ('./../Services/UsersService');
const validatorHandler = require('../Middlewares/ValidatorHandler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../Schema/UsersSchema');
const router = express.Router();
const service = new UsersService();

/*Crearemos un endpoint que nos recoge parámetros
tipo query*/
router.get('/', async (request, response) => {
  const users = await service.find();
  response.status(200).json(users);

  // const {limit, offset} = request.query;
  // if (limit && offset) {
  //   response.json({
  //     limit,
  //     offset
  //   });
  // } else {
  //   response.send('No hay parámetros. :c');
  // }
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (request, response, next)=>{
    try {
      const {id} = request.params;
      const user = await service.findOne(id);
      response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const newUser = await service.create(body)
    response.status(201).json(newUser);
  });

  router.patch('/:id',
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async ( request, response, next ) => {
    try {
      const {id} = request.params;
      const body = request.body;
      const user = await service.update(id, body);
      response.json(user);
    } catch (error) {
      next(error);
    }
});

router.put('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (request, response, next) => {
    try {
      const {id} = request.params;
      const body = request.body;
      const user = await service.update(id, body);
      response.json(user);
    } catch (error) {
      next(error);
    }
});

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (request, response, next) => {
    try {
      const {id } = request.params
      const delUser = await service.delete(id);
      response.json(delUser);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;

