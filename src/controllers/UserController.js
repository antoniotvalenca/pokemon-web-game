const UserService = require('../services/UserService')();
const { pick } = require('lodash');

module.exports = () => {
    const store = async (req, res) => {
        try {
            const user_data = pick(req.body, ['nickname', 'password', 'name']);
            const chosen_pokemon = pick(req.body, ['pokemon_name']);

            const user = await UserService.createUser(user_data, chosen_pokemon);
            return res.json({ user });

        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar usuário e Pokémon.'});
          };
        };

    const login = async (req, res) => {
        try {
            const login_infos = pick(req.body, ['nickname', 'password']);
            const login_token = await UserService.loginUser(login_infos);

            return res.json(login_token);

        } catch (error) {
            return res.status(500).json({ message: 'Erro ao logar usuário' });
        };
    };
    
    const update = async (req, res) => {
        try {
            const change = pick(req.body, )
        } catch (error) {

        }
    };
    // const destroy

    return {
        store,
        login
    }
}