'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: "https://res.cloudinary.com/admincar/image/upload/v1664688949/avatar/Pngtree_user_icon_5097430_xleluw.png",
      },
      numberphone: {
        type: Sequelize.STRING,
        defaultValue: "0",
      },
      address: {
        type: Sequelize.STRING,
        defaultValue: "Chưa có",
      },
      cityId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      districtId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      wardId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      sex: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      date: {
        type: Sequelize.STRING,
        defaultValue: null,
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
    await queryInterface.dropTable('Users');
  }
};