"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init(
    {
      prod_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      prod_title: {
        type: DataTypes.STRING,
      },
      prod_category: {
        type: DataTypes.STRING,
      },
      prod_desc: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
