const { pick } = require('lodash');
const PokemonService = require('../services/PokemonService')();
const { generateRandomPokemon } = require('../utils/generatePokemon')();

module.exports = () => { 

    const store = async (req, res) => {
        try {
            const pokemon = pick(req.body, ['random_pokemon']);
            const create_pokemon = await PokemonService.createNewPokemon(pokemon);

            return res.json({ create_pokemon });

        } catch (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar Pokémon.'})
        };
    };

    const randomPokemon = async (req, res) => {
        try {
            const random_pokemon = generateRandomPokemon(req.user_id);
            console.log(random_pokemon);
            return res.json({ random_pokemon });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao gerar Pokémon.'})
        }
    }

    const battle = async (req, res) => {
        const random_pokemon = pick(req.body, ['random_pokemon']);
        const battle_result = await PokemonService.battlePokemon(req.user_id, random_pokemon.random_pokemon);

        return res.json(battle_result);
    };
    return {
        store,
        randomPokemon,
        battle,
    };
};