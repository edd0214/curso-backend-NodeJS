//Llamamos al módulo
const Joi = require('joi');

//Definimos los parámetros de cada valor.
const id = Joi.string().uuid();
const name = Joi.string().min(2).max(20);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

//Definimos los schemas.

//Schema para crear
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

//Schema para actualizar
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
});

//Schema GET
const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
