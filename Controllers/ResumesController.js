const BaseController = require("./BaseController");

class ResumesController extends BaseController {
  constructor(model, job_applicationModel) {
    super(model);
    this.job_applicationModel = job_applicationModel;
  }

  // add resume
  async uploadResume(req, res) {
    const { resumeContent } = req.body;
    try {
      const resume = await this.model.create({
        resume_content: resumeContent,
        // user_id: userId,
      });
      return res.json(resume);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  //get all resume
  async getResume(req, res) {
    try {
      const output = await this.model.findAll({
        attributes: ["resume_content"],
      });

      res.json(output);
    } catch (err) {
      console.error("Error in getResume:", err);
      res.status(400).json({ error: true, msg: err.message });
    }
  }
  //get resumeid
  async getResumeById(req, res) {
    const resumeId = req.params.id;
    try {
      const resume = await this.model.findOne({
        where: { id: resumeId },
        attributes: ["resume_content"],
      });

      if (!resume) {
        return res.status(404).json({ error: true, msg: "Resume not found" });
      }

      res.json(resume);
    } catch (err) {
      console.error("Error in getResumeById:", err);
      res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = ResumesController;
