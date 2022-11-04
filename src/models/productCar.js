'use strict';
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
        }
    }
    ProductCars.init({
        product_car_id: DataTypes.STRING,
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        money: DataTypes.STRING,
        colortypeone: DataTypes.STRING,
        colortypetwo: DataTypes.STRING,
        colortypethree: DataTypes.STRING,
        energy: DataTypes.INTEGER,
        avatar: DataTypes.STRING,
        description: DataTypes.TEXT,
        checked: DataTypes.BOOLEAN,
        sold: DataTypes.STRING,
        amount: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ProductCars',
    });
    return ProductCars;
};