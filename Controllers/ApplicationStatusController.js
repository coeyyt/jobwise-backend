"use strict";

const BaseController = require("./BaseController");

class ApplicationStatusController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Method to update application status
  updateStatus = async (req, res) => {
    try {
      const { status, jobApplicationId } = req.body;
      const userId = req.user.id; // Assuming user ID is available in req.user

      // Find the application
      const application = await this.model.findOne({
        where: {
          job_application_id: jobApplicationId,
          user_auth0_user_id: userId,
        },
      });

      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      // Update the status
      application.status = status;
      await application.save();

      res
        .status(200)
        .json({ message: "Status updated successfully", application });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  // Method to get the current status of an application
  getStatus = async (req, res) => {
    try {
      const { jobApplicationId } = req.params;
      const userId = req.user.id;

      const application = await this.model.findOne({
        where: {
          job_application_id: jobApplicationId,
          user_auth0_user_id: userId,
        },
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
