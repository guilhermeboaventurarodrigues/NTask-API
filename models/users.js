const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  const Users = app.db.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      set(value) {
        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(value, salt);
        this.setDataValue("password", password);
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validade: {
        notEmpty: true,
      },
    },
  });
  return Users;
};
