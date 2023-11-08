"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.resume, { foreignKey: "user_auth0_user_id" });
      User.hasMany(models.customized_resume, {
        foreignKey: "user_auth0_user_id",
      });
      User.hasMany(models.job_application, {
        foreignKey: "user_auth0_user_id",
      });

      User.hasMany(models.application_status, {
        foreignKey: "user_auth0_user_id",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      auth0_user_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },

    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
