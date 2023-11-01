class JobApplicationsRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
  }
  routes() {
    const router = this.express.Router();
    // router.post("/", this.controller.addJobApplication.bind(this.controller));
    router.get("/", (req, res) => {
      this.controller.getallJobApplication(req, res);
    });
    // router.get("/:id", (req, res) => {
    //   this.controller.getallJobApplication(req, res);
    // });
    router.post("/", (req, res) => {
      this.controller.addAndGenerateCustomResume(req, res);
    });
    return router;
  }
}

module.exports = JobApplicationsRouter;
