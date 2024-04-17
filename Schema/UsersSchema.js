const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(2).max(20);
const lastName = Joi.string().min(2).max(30);
const email = Joi.string().email();
const isBlock = Joi.boolean();

const createUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  isBlock: isBlock.required(),
});
const updateUserSchema = Joi.object({
  name: name,
  lastName: lastName,
  email: email,
  isBlock: isBlock,
});
const getUserSchema = Joi.object({
  id: id.required(),

});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
