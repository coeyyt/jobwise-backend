const BaseController = require("./BaseController");

class CustomizedResumesController extends BaseController {
  constructor(model) {
    super(model);
  }

  //get by resumeid
  async getCustomizedResume(req, res) {
    try {
      const output = await this.model.findAll({
        attributes: ["content"],
      });

      res.json(output);
    } catch (err) {
      console.error("Error in getResume:", err);
      res.status(400).json({ error: true, msg: err.message });
    }
  }

  async getOneCustomizedResume(req, res) {
    try {
      const jobApplicationId = req.params.jobApplicationId; // Extract the ID from request params

      // Validate if the ID is provided
      if (!jobApplicationId) {
        return res
          .status(400)
          .json({ error: true, msg: "job_application_id is required." });
      }

      const oneOutput = await this.model.findOne({
        attributes: ["content"], // Use findOne to get a single record
        where: {
          job_application_id: jobApplicationId, // Filter by job_application_id
        },
      });

      if (!oneOutput) {
        return res.status(404).json({ error: true, msg: "No record found." });
      }

      res.json(oneOutput);
    } catch (err) {
      console.error("Error in getCustomizedResume:", err);
      res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = CustomizedResumesController;
