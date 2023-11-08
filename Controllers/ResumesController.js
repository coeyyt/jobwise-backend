const BaseController = require("./BaseController");

class ResumesController extends BaseController {
  constructor(model, job_applicationModel, userModel) {
    super(model);
    this.job_applicationModel = job_applicationModel;
    this.userModel = userModel;
  }

  // add resume
  async uploadResume(req, res) {
    const { resume_content, user_auth0_user_id } = req.body;

    try {
      let resume = await this.model.findOne({
        where: { user_auth0_user_id: user_auth0_user_id },
      });

      if (resume) {
        // Update existing resume
        resume.resume_content = resume_content;
        await resume.save();
        return res
          .status(200)
          .json({ message: "Resume updated successfully", resume });
      } else {
        // Create new resume
        resume = await this.model.create({
          resume_content,
          user_auth0_user_id,
        });
        return res
          .status(201)
          .json({ message: "Resume created successfully", resume });
      }
    } catch (err) {
      return res.status(500).json({ error: true, message: err.message });
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
  // Get resume_content by Auth0 User ID
  async getResumeByAuth0UserId(req, res) {
    const user_auth0_user_id = req.params.auth0UserId;
    try {
      const resume = await this.model.findOne({
        where: { user_auth0_user_id: user_auth0_user_id },
        attributes: ["resume_content"],
      });

      if (!resume) {
        return res.status(404).json({ error: true, msg: "Resume not found" });
      }

      res.json(resume);
    } catch (err) {
      console.error("Error in getResumeByAuth0UserId:", err);
      res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Get resume_id by Auth0 User ID
  async getResumeIDByAuth0UserId(req, res) {
    const user_auth0_user_id = req.params.auth0UserId;
    try {
      const resumeID = await this.model.findOne({
        where: { user_auth0_user_id: user_auth0_user_id },
        attributes: ["id"], // Selects only the 'id' column
      });

      if (!resumeID) {
        return res.status(404).json({ error: true, msg: "Resume not found" });
      }

      // Send only the resume ID, not the entire resume object
      res.json({ resume_id: resumeID.id });
    } catch (err) {
      console.error("Error in getResumeIDByAuth0UserId:", err);
      res.status(500).json({ error: true, msg: "Internal server error" });
    }
  }

  async updateResume(req, res) {
    const { resume_content } = req.body;
    const resumeId = req.params.resumeId;

    try {
      let resume = await this.model.findByPk(resumeId);

      if (!resume) {
        return res.status(404).json({ error: true, msg: "Resume not found" });
      }

      resume.resume_content = resume_content;
      await resume.save();
      return res
        .status(200)
        .json({ message: "Resume updated successfully", resume });
    } catch (err) {
      console.error("Error in updateResume:", err);
      res.status(500).json({ error: true, message: err.message });
    }
  }
}

module.exports = ResumesController;
