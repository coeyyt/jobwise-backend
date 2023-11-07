"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("resumes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      resume_content: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("resumes");
  },
};
