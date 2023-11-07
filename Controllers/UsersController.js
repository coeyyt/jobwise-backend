const BaseController = require("./BaseController");

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  registerOrUpdateUser = async (req, res, next) => {
    try {
      console.log(req.headers);
      const { auth0_user_id, email } = req.body;

      // Check if user exists in the database
      let user = await this.model.findOne({
        where: { auth0_user_id: auth0_user_id },
      });

      if (user) {
        // User exists, so we update their email or any other info
        user = await user.update({ email: email });
      } else {
        // User does not exist, so we create a new user record
        user = await this.model.create({
          auth0_user_id: auth0_user_id,
          email: email,
        });
      }

      return res.json(user);
    } catch (err) {
      console.error("The error stack is:", err.stack);
      console.error("The full error object is:", err);
      next(err); // Pass errors to Express
    }
  };
}

module.exports = UsersController;
