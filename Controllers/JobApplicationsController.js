const BaseController = require("./BaseController");
const { generateCustomizedResume } = require("../openai");

class JobApplicationsController extends BaseController {
  constructor(model, resumeModel, customized_resumeModel) {
    super(model);
    this.resumeModel = resumeModel;
    this.customizedResumeModel = customized_resumeModel;
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

  //get 1 job application and its related resume content to prompt chatpgt
  //   async getallJobApplication(req, res) {
  //     try {
  //       const JD = await this.model.findOne({
  //         attributes: ["company_name", "job_title", "job_description"],
  //         include: {
  //           model: this.resumeModel, // Include the resume model to get the resume_content
  //           required: true,
  //           attributes: ["resume_content"],
  //         },
  //       });
  //       // Construct the prompt for OpenAI ChatGPT
  //       const promptContent = `
  //   Resume Content: ${JD.resume.resume_content}
  //   Company Name: ${JD.company_name}
  //   Job Title: ${JD.job_title}
  //   Job Description: ${JD.job_description}
  //   Please generate a customized resume based on the above data.
  // `;

  //       // Get the customized resume from OpenAI ChatGPT
  //       const customizedResume = await generateCustomizedResume(promptContent);

  //       // Respond with both the fetched data and the generated resume
  //       res.json({
  //         jobApplication: JD,
  //         customizedResume: customizedResume,
  //       });
  //     } catch (err) {
  //       console.error("Error in getJobApplication", err);
  //       res.status(400).json({ error: true, msg: err.message });
  //     }
  //   }

  //   async getallJobApplication(req, res) {
  //     try {
  //       const JD = await this.model.findOne({
  //         attributes: ["company_name", "job_title", "job_description", "id"],
  //         include: {
  //           model: this.resumeModel, // Include the resume model to get the resume_content
  //           required: true,
  //           attributes: ["resume_content", "id"],
  //         },
  //       });
  //       // Construct the prompt for OpenAI ChatGPT
  //       const promptContent = `
  //   Resume Content: ${JD.resume.resume_content}
  //   Company Name: ${JD.company_name}
  //   Job Title: ${JD.job_title}
  //   Job Description: ${JD.job_description}
  //   Please generate a customized resume based on the above data.
  // `;

  //       // Get the customized resume from OpenAI ChatGPT
  //       const customizedResume = await generateCustomizedResume(promptContent);
  //       const resumeContentString = customizedResume.content;

  //       const newCustomizedResume = await this.customizedResumeModel.create({
  //         content: resumeContentString,
  //         job_application_id: JD.id,
  //         resume_id: JD.resume.id,
  //         created_at: new Date(),
  //         updated_at: new Date(),
  //       });

  //       // Respond with both the fetched data and the generated resume
  //       res.json({
  //         jobApplication: JD,
  //         customizedResume: customizedResume,
  //         savedCustomizedResume: newCustomizedResume,
  //       });
  //     } catch (err) {
  //       console.error("Error in getJobApplication", err);
  //       res.status(400).json({ error: true, msg: err.message });
  //     }
  //   }

  // Assuming we have an import or a method for generateCustomizedResume
  // and necessary imports for database models and utility methods.

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
