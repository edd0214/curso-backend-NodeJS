const {faker} = require ("@faker-js/faker");
const boom = require('@hapi/boom');

class CategoriesService {

  constructor( ) {
    this.categories = [];
    this.generate();
  }

  generate( ){
    const total = 20;
    for (let index = 0; index < total; index++) {
      this.categories.push({
        id: faker.string.uuid(),
        category: faker.commerce.department(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create( data ) {
    const newCategory = {
      id: faker.string.uuid(),
      ...data
    }
    this.categories.push(newCategory);
    return newCategory;
  }

  async find() {
    return new Promise ((resolve)=>{
      setTimeout(() =>{
        resolve(this.categories);
      }, 2000);
    })
  }

  async findOne(id) {
    const category = this.categories.find(item => item.id === id);
    if (!category) {
      throw boom.notFound('Category not found!');
    }
    if (category.isBlock) {
      throw boom.conflict('Category is block!');
    }
    return category;
  }

  async update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found :c');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    };
    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found :c');
    }
    this.categories.splice(index, 1);
    return {message: `The category with id ${id} has been deleted!`}
  }
}


module.exports = CategoriesService;
