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
                type: Sequelize.JSON,
            },
            colortypetwo: {
                type: Sequelize.JSON,
            },
            colortypethree: {
                type: Sequelize.JSON,
            },
            energy: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            avatar: {
                type: Sequelize.JSON,
            },
            description: {
                type: Sequelize.TEXT('long'),
            },
            descriptionHTML: {
                type: Sequelize.TEXT('long'),
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