"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customized_resumes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.TEXT,
      },
      job_application_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "job_applications",
          key: "id",
        },
        allowNull: false,
      },

      resume_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "resumes",
          key: "id",
        },
        allowNull: false,
      },

      user_auth0_user_id: {
        type: Sequelize.STRING,
        references: {
          model: "users",
          key: "auth0_user_id",
        },
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("customized_resumes");
  },
};
