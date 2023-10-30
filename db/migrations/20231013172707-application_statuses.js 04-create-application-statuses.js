"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("application_statuses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      job_application_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "job_applications",
          key: "id",
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
    await queryInterface.dropTable("application_statuses");
  },
};
