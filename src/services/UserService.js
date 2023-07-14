const { sequelize } = require('../models/User');
const PokemonService = require('../services/PokemonService')();
const User = require ('../models/User');
const jwt = require('jsonwebtoken');
const { compareSync } = require('bcrypt');

module.exports = () => {

    const createUser = async (user_data, chosen_pokemon)=> {
        const is_user_created = await User.findOne({
            where: { nickname: user_data.nickname },
        });

        if (is_user_created) throw 'Nickname já está sendo usado';

        const transaction = await sequelize.transaction();

        let user;
        let pokemon;

        try {
            user = await User.create(user_data, { transaction: transaction });
            final_pokemon = await PokemonService.createInitialPokemon(chosen_pokemon, transaction, user);
            await transaction.commit()

        } catch (error) {
            await transaction.rollback()
            console.log(error);
        }

        return {user, pokemon};
    };

    const loginUser = async (login_infos) => {
        const user = await User.findOne({ where: { nickname: login_infos.nickname }});
        if (!user) throw 'Nome de usuário ou senha inválidos';

        const valid_password = compareSync(login_infos.password, user.password);
        if (!valid_password) throw 'Nome de usuário ou senha inválidos';

        return jwt.sign({
            id: user.id,
            name: user.name,
            nickname: user.nickname,
            xp: user.xp,
        }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
    };

    return {
        createUser,
        loginUser,
    };
}