class JobApplicationsRouter {
  constructor(express, controller, checkJwt) {
    this.express = express;
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    const router = this.express.Router();

    // Assuming checkjwt is a middleware function that validates the JWT token
    // const getallJobApplication = this.controller.getallJobApplication.bind(
    //   this.controller
    // );
    // router.get("/", this.checkJwt, getallJobApplication);

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
