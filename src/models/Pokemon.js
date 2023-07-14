const { Model, Sequelize } = require('sequelize');

class Pokemon extends Model {
    static init(sequelize) {
        super.init({
            user_id: {
                type: Sequelize.INTEGER,
            },

            pokemon_name: {
                type: Sequelize.STRING,
            },

            pokemon_lvl: {
                type: Sequelize.INTEGER,
            },

            attack: {
                type: Sequelize.INTEGER,
            },

            defense: {
                type: Sequelize.INTEGER
            },

            type: {
                type: Sequelize.STRING
            },

            base_power: {
                type: Sequelize.INTEGER,
            },

            move_1: {
                type: Sequelize.STRING
            },

            move_2: {
                type: Sequelize.STRING
            },

            base_xp: {
                type: Sequelize.INTEGER
            },

        }, {
            sequelize,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        })

    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
};

module.exports = Pokemon;