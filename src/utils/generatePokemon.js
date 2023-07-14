const Moves = require('./moves');
const Pokedex = require('./pokedex');

module.exports = () => {
    const generateRandomPokemon = (user_id) => {
        const random_index = Math.floor(Math.random() * Pokedex.length);
        const random_level = Math.floor(Math.random() * 101);
        const random_basepower = Math.floor(Math.random() * 101);

        const pokemon_created = Pokedex[random_index];

        const moves_of_type = Moves.filter( move => move.type === pokemon_created.type[0] );
        const move_index_1 = Math.floor(Math.random() * moves_of_type.length);
        const move_index_2 = Math.floor(Math.random() * moves_of_type.length);

        const random_move_1 = moves_of_type[move_index_1].ename;
        const random_move_2 = moves_of_type[move_index_2].ename;

        const final_pokemon = {
            user_id: user_id,
            pokemon_name: pokemon_created.name.english,
            pokemon_lvl: random_level,
            attack: pokemon_created.base.Attack,
            defense: pokemon_created.base.Defense,
            type: pokemon_created.type[0],
            base_power: random_basepower,
            move_1: random_move_1,
            move_2: random_move_2,
            base_xp: 3 * random_level
        };

        return final_pokemon
    };

    return {
        generateRandomPokemon
    };
};