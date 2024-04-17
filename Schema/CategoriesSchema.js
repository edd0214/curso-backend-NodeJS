const Joi = require('joi');

const id = Joi.string().uuid();
const category = Joi.string().min(3).max(25);
const isBlock = Joi.boolean();


const createCategorySchema = Joi.object({
  category: category.required(),
  isBlock: isBlock.required(),
});

const updateCategorySchema = Joi.object({
  category: category,
  isBlock: isBlock,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = {createCategorySchema, updateCategorySchema, getCategorySchema}
