"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("resumes", [
      {
        resume_content: "Ninja van jan 2022 - jul 2023",
        user_id: "9",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("resumes", null, {});
  },
};
