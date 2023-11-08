class UserRouter {
  constructor(express, controller, checkJwt) {
    this.express = express;
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    const router = this.express.Router();


    // Bind the controller methods to the correct context
    const boundRegisterOrUpdateUser = this.controller.registerOrUpdateUser.bind(
      this.controller
    );

    // Use the bound method as a route handler
    router.post("/", this.checkJwt, boundRegisterOrUpdateUser);

    return router;
  }
}

module.exports = UserRouter;
