'use strict';
const { model } = require('mongoose');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductCars extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ProductCars.belongsTo(models.Categorys, { foreignKey:'type', as: 'CategoryData' })
        }
    }
    ProductCars.init({
        name: DataTypes.STRING,
        type: DataTypes.INTEGER,
        money: DataTypes.STRING,
        colortypeone: DataTypes.JSON,
        colortypetwo: DataTypes.JSON,
        colortypethree: DataTypes.JSON,
        energy: DataTypes.INTEGER,
        avatar: DataTypes.JSON,
        description: DataTypes.TEXT('long'),
        descriptionHTML: DataTypes.TEXT('long'),
        checked: DataTypes.BOOLEAN,
        amount: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'ProductCars',
    });
    return ProductCars;
};