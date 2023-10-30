"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("application_statuses", [
      {
        status: "Bookmarked",
        job_application_id: "1",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status: "Applied",
        job_application_id: "2",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("application_statuses", null, {});
  },
};
