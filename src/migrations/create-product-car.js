'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ProductCars', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            product_car_id: {
                type: Sequelize.STRING(100),
                unique: true,
                trim: true,
                required: true
            },
            name: {
                type: Sequelize.STRING(255),
                require: true,
                unique: true,
                trim: true
            },
            type: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            money: {
                type: Sequelize.STRING(20),
            },
            colortypeone: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            colortypetwo: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            colortypethree: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            energy: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            avatar: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
            },
            checked: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            sold: {
                type: Sequelize.STRING,
                defaultValue: 0,
            },
            amount: {
                type: Sequelize.STRING,
                defaultValue: 0,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ProductCars');
    }
};