"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("carts", {
      cart_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      prod_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      prod_qty: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      prod_price: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      cat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("carts");
  },
};
