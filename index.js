const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db/models/index");

const { resume, job_application, customized_resume } = db;

const ResumesRouter = require("./Routers/ResumesRouter");
const ResumesController = require("./Controllers/ResumesController");
const JobApplicationsRouter = require("./Routers/JobApplicationsRouter");
const JobApplicationsController = require("./Controllers/JobApplicationsController");
const CustomizedResumesRouter = require("./Routers/CustomizedResumesRouter");
const CustomizedResumesController = require("./Controllers/CustomizedResumesController");
const PORT = process.env.PORT || 3000;

const app = express();

const resumesController = new ResumesController(resume);
const resumesRouter = new ResumesRouter(express, resumesController).routes();
const jobApplicationsController = new JobApplicationsController(
  job_application,
  resume,
  customized_resume
);
const jobApplicationsRouter = new JobApplicationsRouter(
  express,
  jobApplicationsController
).routes();
const customizedResumesController = new CustomizedResumesController(
  customized_resume
);
const customizedResumesRouter = new CustomizedResumesRouter(
  express,
  customizedResumesController
).routes();

app.use(cors());
app.use(express.json());

app.use("/resumes", resumesRouter);
app.use("/jobapplications", jobApplicationsRouter);
app.use("/customizedresumes", customizedResumesRouter);

app.listen(PORT, () => {
  console.log("Application listening to port 3000");
});
