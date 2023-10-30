// const BaseController = require("./BaseController");

// class UsersController extends BaseController {
//   constructor(model) {
//     super(model);
//   }

//   // add resume
//   async upsertUser(req, res) {
//     console.log("Upserting user..."); // Logs when the function is called

//     const { auth0_user_id, email } = req.body;
//     console.log("Received data:", { auth0_user_id, email }); // Logs the data received in the request

//     try {
//       // Check if the user already exists
//       let user = await this.model.findOne({ where: { auth0_user_id } });
//       console.log("User found:", user); // Logs the result of the findOne operation

//       if (!user) {
//         // Create a new user if they don't exist
//         user = await this.model.create({ auth0_user_id, email });
//         console.log("User created:", user); // Logs the newly created user

//         return res.status(201).json(user);
//       }

//       // If the user already exists, update their data
//       user = await this.model.update({ email });
//       console.log("User updated:", user); // Logs the updated user

//       return res.json(user);
//     } catch (error) {
//       console.error("Error encountered:", error); // Logs any errors that occur

//       return res.status(500).json({ error: "Internal server error" });
//     }
//   }
// }

// module.exports = UsersController;
