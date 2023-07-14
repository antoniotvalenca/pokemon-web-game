const { Router } = require('express');
const routes = new Router();

const UserController = require('../controllers/UserController')();
const PokemonController = require('../controllers/PokemonController')();
const isLogged = require('../middlewares/isLogged')();

routes.post('/signup', UserController.store);
routes.post('/login', UserController.login);
routes.get('/explore', isLogged.auth, PokemonController.randomPokemon);
routes.post('/battle', isLogged.auth, PokemonController.battle);
module.exports = routes