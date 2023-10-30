const BaseController = require("./BaseController");

class JobApplicationsController extends BaseController {
  constructor(model) {
    super(model);
  }
  // add job application
  async addJobApplication(req, res) {
    const { companyName, jobTitle, jobDescription, resumeId } = req.body;
    try {
      const jobApplication = await this.model.create({
        company_name: companyName,
        job_title: jobTitle,
        job_description: jobDescription,
        resume_id: resumeId,
      });
      return res.json(jobApplication);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getJobApplication(req, res) {
    try {
      const output = await this.model.findAll({
        attributes: ["company_name", "job_title", "job_description"],
      });
      res.json(output);
    } catch (err) {
      console.error("Error in getJobApplication", err);
      res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = JobApplicationsController;
