"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customized_Resume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.job_application);
      this.belongsTo(models.resume);
      this.belongsTo(models.user, { foreignKey: "user_auth0_user_id" });
    }
  }
  Customized_Resume.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      content: {
        type: DataTypes.TEXT,
      },
      job_application_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "job_application",
          key: "id",
        },
        allowNull: false,
      },

      resume_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "resume",
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
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "customized_resume",
      underscored: true,
    }
  );
  return Customized_Resume;
};
