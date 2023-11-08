"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Application_Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.job_application);
      this.belongsTo(models.user, { foreignKey: "user_auth0_user_id" });
    }
  }
  Application_Status.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      job_application_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "job_application",
          key: "id",
        },
        allowNull: false,
      },
      user_auth0_user_id: {
        type: DataTypes.STRING,
        references: {
          model: "user",
          key: "auth0_user_id",
        },
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
      modelName: "application_status",
      underscored: true,
    }
  );
  return Application_Status;
};
