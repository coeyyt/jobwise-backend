class ApplicationStatusRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
  }
  routes() {
    const router = this.express.Router();

    router.post("/updateStatus", (req, res) => {
      this.controller.updateStatus(req, res);
    });

    router.get(
      "/getStatus/:jobApplicationId/:user_auth0_user_id",
      (req, res) => {
        this.controller.getStatus(req, res);
      }
    );
    return router;
  }
}

module.exports = ApplicationStatusRouter;
