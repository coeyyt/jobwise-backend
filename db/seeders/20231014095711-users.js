"use strict";

module.exports = {
  async up(queryInterface) {
    const result = await queryInterface.bulkInsert(
      "users",
      [
        {
          auth0_user_id: "testacc2",
          email: "test2@test2.com",
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    console.log(result); // Log the returned result to see the IDs.
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
