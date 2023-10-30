class ResumesRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
    // this.checkJwt = checkJwt;
  }
  routes() {
    const router = this.express.Router();
    // console.log("Controller:", this.controller);
    // console.log("JWT Checker:", this.checkJwt);
    router.post("/", this.controller.uploadResume.bind(this.controller));
    console.log("Setting up resume routes");

    router.get("/", (req, res) => {
      this.controller.getResume(req, res);
    });

    return router;
  }
}

module.exports = ResumesRouter;
