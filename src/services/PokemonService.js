const Pokedex = require('../utils/pokedex.js');
const Pokemon = require('../models/Pokemon');
const Moves = require('../utils/moves');
const User = require('../models/User');
const { sequelize } = require('../models/User');

module.exports = () => {
    const createInitialPokemon = async (pokemonName, transaction, final_user) => {
        let initial_pokemon;

        switch (pokemonName.pokemon_name) {
            case 'Bulbasaur':
                initial_pokemon = {
                    user_id: final_user.id,
                    pokemon_name: pokemonName.pokemon_name,
                    pokemon_lvl: 5,
                    attack: Pokedex[0].base.Attack,
                    defense: Pokedex[0].base.Defense,
                    type: Pokedex[0].type[0],
                    base_power: 80,
                    move_1: 'Vine Whip',
                    move_2: 'Tackle',
                    base_xp: 15,
                };

                break;
            case 'Charmander':
                initial_pokemon = {
                    user_id: final_user.id,
                    pokemon_name: pokemonName.pokemon_name,
                    pokemon_lvl: 5,
                    attack: Pokedex[3].base.Attack,
                    defense: Pokedex[3].base.Defense,
                    type: Pokedex[3].type[0],
                    base_power: 80,
                    move_1: 'Ember',
                    move_2: 'Scratch',
                    base_xp: 15,
                };

                break;
            case 'Squirtle':
                initial_pokemon = {
                    user_id: final_user.id,
                    pokemon_name: pokemonName.pokemon_name,
                    pokemon_lvl: 5,
                    attack: Pokedex[6].base.Attack,
                    defense: Pokedex[6].base.Defense,
                    type: Pokedex[6].type[0],
                    base_power: 80,
                    move_1: 'Water Gun',
                    move_2: 'Tackle',
                    base_xp: 15,
                };
                break;
        };

        return await Pokemon.create(initial_pokemon, { transaction: transaction });
    };

    const createNewPokemon = async (pokemon) => {
        return await Pokemon.create(pokemon);
    };

    const battlePokemon = async (user_id, random_pokemon) => {
        const all_pokemons = await Pokemon.findAll({ where: { user_id: user_id }});
        const findItemByName = (ename) => Moves.find( Move => { if (Move.ename === ename && Move.ename !== "none") return Move; });
        let user_power = 0;

        all_pokemons.forEach(pokemon => {
            const move1 = findItemByName(pokemon.move_1);
            const move2 = findItemByName(pokemon.move_2);

            user_power += pokemon.base_power / 100 * (pokemon.attack + pokemon.defense + (2 * pokemon.pokemon_lvl));

            user_power += move1 && move1.power !== null ? move1.power : 30;
            user_power += move2 && move2.power !== null ? move2.power : 30;
        });

        const move1 = findItemByName(random_pokemon.move_1);
        const move2 = findItemByName(random_pokemon.move_2);
        const move1Power = move1 && move1.power !== null ? move1.power : 30;
        const move2Power = move2 && move2.power !== null ? move2.power : 30;

        const random_power = random_pokemon.base_power / 100 * (random_pokemon.attack + random_pokemon.defense + (2 * random_pokemon.pokemon_lvl) + move1Power + move2Power);

        if (user_power >= random_power) {
            await User.update(
                { xp: sequelize.literal('xp + 3') },
                { where: { id: user_id } }
            );
            return 'Você venceu! :) [+3 xp]';
        } else {
            return 'Você perdeu! ):';
        };
    };

    return {
        createInitialPokemon,
        createNewPokemon,
        battlePokemon,
    };
}