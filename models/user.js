
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class user extends Model {
    checkPassword(userPassword) {
        return bcrypt.compareSync(userPassword, this.password);
    }
}

user.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    pseudonym: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10]
        }
    }
},

{
    hooks: {
        async beforeCreate(userInfoNEW) {
            userInfoNEW.password = await bcrypt.hash(userInfoNEW.password, 10);
            return userInfoNEW;
        },
        async beforeUpdate(userInfoUPDATE) {
            userInfoUPDATE.password = await bcrypt.hash(userInfoUPDATE.password, 10);
            return userInfoUPDATE;
        }

    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "user"
}
);


module.exports = user;