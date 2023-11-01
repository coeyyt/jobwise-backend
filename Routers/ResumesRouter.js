class ResumesRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
    // this.checkJwt = checkJwt;
  }
  routes() {
    const router = this.express.Router();
    // user to post resume
    router.post("/", this.controller.uploadResume.bind(this.controller));
    console.log("Setting up resume routes");
    // to display the posted resume
    router.get("/", (req, res) => {
      this.controller.getResume(req, res);
    });
    router.get("/:id", (req, res) => {
      this.controller.getResumeById(req, res);
    });

    return router;
  }
}

module.exports = ResumesRouter;
