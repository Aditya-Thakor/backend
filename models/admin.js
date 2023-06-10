"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  admin.init(
    {
      admin_name: DataTypes.STRING,
      admin_email: DataTypes.STRING,
      admin_password: DataTypes.STRING,
      admin_roles: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "admin",
    }
  );
  return admin;
};
