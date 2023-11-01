"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job_Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.resume);
      this.hasOne(models.customized_resume);
      this.hasOne(models.application_status);
    }
  }
  Job_Application.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      job_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      job_description: {
        type: DataTypes.TEXT,
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
      modelName: "job_application",
      underscored: true,
    }
  );
  return Job_Application;
};
