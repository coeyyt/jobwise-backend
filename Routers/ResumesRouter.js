class ResumesRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
    // this.checkJwt = checkJwt;
  }
  routes() {
    const router = this.express.Router();

    router.post("/", (req, res) => {
      this.controller.uploadResume(req, res);
    });

    console.log("Setting up resume routes");

    // to display the posted resume
    router.get("/", (req, res) => {
      this.controller.getResume(req, res);
    });
    //get resume_content by auth0userId
    router.get("/user/:auth0UserId", (req, res) => {
      this.controller.getResumeByAuth0UserId(req, res);
    });

    //get resume_id by auth0userId
    router.get("/id/user/:auth0UserId", (req, res) => {
      console.log("Auth0 User ID:", req.params.auth0UserId); // Check if this logs correctly
      this.controller.getResumeIDByAuth0UserId(req, res);
    });

    // Route for updating a resume
    router.put("/:resumeId", (req, res) => {
      this.controller.updateResume(req, res);
    });
    return router;
  }
}

module.exports = ResumesRouter;
