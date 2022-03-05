const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class post extends Model {}
post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        post_input: {
            type: DataTypes.STRING(420),
            allowNull: false
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: "post"
    }
);


module.exports = post;