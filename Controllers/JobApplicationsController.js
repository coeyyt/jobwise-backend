const BaseController = require("./BaseController");
const { generateCustomizedResume } = require("../openai");

class JobApplicationsController extends BaseController {
  constructor(model, resumeModel, customized_resumeModel, userModel) {
    super(model);
    this.resumeModel = resumeModel;
    this.customizedResumeModel = customized_resumeModel;
    this.userModel = userModel;
    this.getallJobApplication = this.getallJobApplication.bind(this);
  }
  // // add job application
  // async addJobApplication(req, res) {
  //   const { company_name, job_title, job_description, resume_id } = req.body;
  //   try {
  //     const jobApplication = await this.model.create({
  //       company_name: company_name,
  //       job_title: job_title,
  //       job_description: job_description,
  //       resume_id: resume_id,
  //     });
  //     return res.json(jobApplication);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }

  // get all job applicaitons
  async getallJobApplication(req, res) {
    try {
      const output = await this.model.findAll({
        attributes: ["id", "company_name", "job_title", "job_description"],
      });
      res.json(output);
    } catch (err) {
      console.error("Error in getJobApplication", err);
      res.status(400).json({ error: true, msg: err.message });
    }
  }

  async addAndGenerateCustomResume(req, res) {
    const { company_name, job_title, job_description, resume_id } = req.body;
    try {
      // 1. Add the job application to the database
      const jobApplication = await this.model.create({
        company_name: company_name,
        job_title: job_title,
        job_description: job_description,
        resume_id: resume_id,
      });

      // 2. Fetch the job application with the related resume
      const JD = await this.model.findOne({
        where: { id: jobApplication.id },
        attributes: ["company_name", "job_title", "job_description", "id"],
        include: {
          model: this.resumeModel,
          required: true,
          attributes: ["resume_content", "id"],
        },
      });

      // 3. Construct the prompt for OpenAI ChatGPT
      const promptContent = `
  Resume Content: ${JD.resume.resume_content}
  Company Name: ${JD.company_name}
  Job Title: ${JD.job_title}
  Job Description: ${JD.job_description}
  Please generate a customized resume based on the above data.
  `;

      // 4. Get the customized resume from OpenAI ChatGPT
      const customizedResume = await generateCustomizedResume(promptContent);
      const resumeContentString = customizedResume.content;

      // 5. Save the generated resume to the database
      const newCustomizedResume = await this.customizedResumeModel.create({
        content: resumeContentString,
        job_application_id: JD.id,
        resume_id: JD.resume.id,
        created_at: new Date(),
        updated_at: new Date(),
      });

      // 6. Respond with the job application, original resume, and generated resume
      res.json({
        jobApplication: JD,
        originalResume: JD.resume,
        customizedResume: resumeContentString,
        savedCustomizedResume: newCustomizedResume,
      });
    } catch (err) {
      console.error("Error in addAndGenerateCustomResume", err);
      res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = JobApplicationsController;
