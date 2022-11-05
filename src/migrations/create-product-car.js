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
                trim: true,
                required: true
            },
            name: {
                type: Sequelize.STRING(255),
                require: true,
                trim: true
            },
            type: {
                type: Sequelize.INTEGER,
            },
            money: {
                type: Sequelize.STRING(20),
            },
            colortypeone: {
                type: Sequelize.STRING(255),
            },
            colortypetwo: {
                type: Sequelize.STRING(255),
            },
            colortypethree: {
                type: Sequelize.STRING(255),
            },
            energy: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            avatar: {
                type: Sequelize.STRING(255),
            },
            description: {
                type: Sequelize.TEXT,
            },
            checked: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            amount: {
                type: Sequelize.INTEGER,
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