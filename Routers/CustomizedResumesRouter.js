class CustomizedResumesRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
  }
  routes() {
    const router = this.express.Router();
    router.get("/:jobApplicationId", (req, res) => {
      // Use a dynamic route parameter
      this.controller.getOneCustomizedResume(req, res);
    });

    router.get("/", (req, res) => {
      this.controller.getCustomizedResume(req, res);
    });

    return router;
  }
}

module.exports = CustomizedResumesRouter;
