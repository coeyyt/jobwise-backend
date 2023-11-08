"use strict";

const BaseController = require("./BaseController");

class ApplicationStatusController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Method to update application status
  updateStatus = async (req, res) => {
    const { status, job_application_id, user_auth0_user_id } = req.body;

    try {
      let application_status = await this.model.findOne({
        where: {
          job_application_id: job_application_id,
          user_auth0_user_id: user_auth0_user_id,
        },
      });

      if (application_status) {
        // Update existing status
        application_status.status = status;
        await application_status.save();
        return res
          .status(200)
          .json({ message: "status updated successfully", application_status });
      } else {
        // Create new resume
        application_status = await this.model.create({
          status,
          job_application_id,
          user_auth0_user_id,
        });
        return res
          .status(201)
          .json({ message: "Resume created successfully", application_status });
      }
    } catch (err) {
      return res.status(500).json({ error: true, message: err.message });
    }
  };

  // Method to get the current status of an application
  getStatus = async (req, res) => {
    const { job_application_id, user_auth0_user_id } = req.params;

    try {
      const application = await this.model.findOne({
        where: {
          job_application_id: job_application_id,
          user_auth0_user_id: user_auth0_user_id,
        },
        attributes: ["status"],
      });

      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      res.status(200).json({ application });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
}

module.exports = ApplicationStatusController;
