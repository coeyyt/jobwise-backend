"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("job_applications", [
      {
        resume_id: 1,
        company_name: "Meta",
        job_title: "Software Engineer",
        job_description: "",
        created_at: new Date(),

        updated_at: new Date(),
      },
      {
        resume_id: 1,
        company_name: "Amazon",
        job_title: "Software Engineer",
        job_description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("job_applications", null, {});
  },
};
