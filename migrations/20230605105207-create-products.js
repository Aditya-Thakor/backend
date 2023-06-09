"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      prod_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      prod_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prod_price: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      prod_category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prod_desc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prod_image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prod_img_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
