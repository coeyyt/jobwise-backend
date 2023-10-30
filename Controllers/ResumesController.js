const BaseController = require("./BaseController");

class ResumesController extends BaseController {
  constructor(model) {
    super(model);
  }

  // add resume
  async uploadResume(req, res) {
    const { resumeContent, userId } = req.body;
    try {
      const resume = await this.model.create({
        resume_content: resumeContent,
        user_id: userId,
      });
      return res.json(resume);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

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
}

// edit resume

module.exports = ResumesController;
