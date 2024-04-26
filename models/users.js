'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasOne(models.auth,{
        foreignKey: {
          name: "userId",
          allowNull:false,
        },
      });
    }
  }
  users.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    address: DataTypes.STRING,
    role: DataTypes.ENUM("superadmin", "admin", "member"),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};