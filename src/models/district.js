'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Districts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Districts.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Districts',
  });
  return Districts;
};