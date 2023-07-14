const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const ModelPokemon = require('../models/Pokemon');
const ModelUser = require('../models/User');

const connection = new Sequelize(dbConfig);

const models = [ModelUser, ModelPokemon];

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));

module.exports = {
  connection,
  models
};
