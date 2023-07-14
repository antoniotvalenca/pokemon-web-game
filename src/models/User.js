const { Model, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
    static init (sequelize) {
        super.init({
            nickname: {
                type: Sequelize.STRING,
            },

            password: {
                type: Sequelize.STRING,
            },

            name: {
                type: Sequelize.STRING,
            },

            badges: {
                type: Sequelize.ENUM('0', '1', '2', '3', '4', '5', '6', '7'),
                defaultValue: 0,
            },

            pokemons_quantity: {
                type: Sequelize.INTEGER,
                defaultValue: 1
            },

            xp: {
                type: Sequelize.INTEGER,
            },

        }, {
            sequelize,
            timestamps: true,
            updatedAt: 'updated_at',
            createdAt: 'created_at',
            hooks: {
                beforeCreate: async user => {
                    if (user.password) user.password = await bcrypt.hash(user.password, 9)
                }
            }
        });
    }

    static associate(models) {
        this.hasMany(models.Pokemon, { foreignKey: 'user_id' })
    }
}

module.exports = User;