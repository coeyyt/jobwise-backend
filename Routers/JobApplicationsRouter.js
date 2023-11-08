class JobApplicationsRouter {
  constructor(express, controller, checkJwt, checkJwtWithLogging) {
    this.express = express;
    this.controller = controller;
    this.checkJwt = checkJwt;
    this.checkJwtWithLogging = checkJwtWithLogging;
  }
  routes() {
    const router = this.express.Router();

    // Fetch all job applications for the logged-in user
    router.get("/:auth0UserId", (req, res) => {
      this.controller.getJobApplicationByAuth0UserId(req, res);
    });

    router.post("/", (req, res) => {
      this.controller.addAndGenerateCustomResume(req, res);
    });
    return router;
  }
}

module.exports = JobApplicationsRouter;
