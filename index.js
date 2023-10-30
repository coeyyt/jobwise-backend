const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db/models/index");

const { resume, job_application } = db;

const ResumesRouter = require("./Routers/ResumesRouter");
const ResumesController = require("./Controllers/ResumesController");
const JobApplicationsRouter = require("./Routers/JobApplicationsRouter");
const JobApplicationsController = require("./Controllers/JobApplicationsController");
// const UsersRouter = require("./Routers/UsersRouter");
// const UsersController = require("./Controllers/UsersController");
const PORT = process.env.PORT || 3000;

const app = express();

const resumesController = new ResumesController(resume);
const resumesRouter = new ResumesRouter(express, resumesController).routes();
const jobApplicationsController = new JobApplicationsController(
  job_application
);
const jobApplicationsRouter = new JobApplicationsRouter(
  express,
  jobApplicationsController
).routes();
// const usersController = new UsersController(user);
// const usersRouter = new UsersRouter(express, usersController).routes();

app.use(cors());
app.use(express.json());

app.use("/resumes", resumesRouter);
app.use("/jobapplications", jobApplicationsRouter);
// app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log("Application listening to port 3000");
});
