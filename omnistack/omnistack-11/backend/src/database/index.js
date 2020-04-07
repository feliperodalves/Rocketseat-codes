const knex = require('knex');
const config = require('../../knexfile');

const conn = knex(
  process.env.NODE_ENV === 'test' ? config.test : config.development
);

module.exports = conn;
