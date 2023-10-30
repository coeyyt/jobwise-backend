"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("customized_resumes", [
      {
        content: "",
        job_application_id: "1",
        resume_id: "1",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        content: "",
        job_application_id: "2",
        resume_id: "1",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("customized_resumes", null, {});
  },
};
