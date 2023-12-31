"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Resume extends Model {
    static associate(models) {
      this.hasMany(models.job_application);
      this.hasMany(models.customized_resume);
      this.belongsTo(models.user, { foreignKey: "user_auth0_user_id" });
    }
  }
  Resume.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      resume_content: {
        type: DataTypes.TEXT,
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
      modelName: "resume",
      underscored: true,
    }
  );
  return Resume;
};
