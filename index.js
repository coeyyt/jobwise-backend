const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { auth } = require("express-oauth2-jwt-bearer");

const db = require("./db/models/index");

const { resume, job_application, customized_resume, user } = db;
const UsersRouter = require("./Routers/UsersRouter");
const UsersController = require("./Controllers/UsersController");
const ResumesRouter = require("./Routers/ResumesRouter");
const ResumesController = require("./Controllers/ResumesController");
const JobApplicationsRouter = require("./Routers/JobApplicationsRouter");
const JobApplicationsController = require("./Controllers/JobApplicationsController");
const CustomizedResumesRouter = require("./Routers/CustomizedResumesRouter");
const CustomizedResumesController = require("./Controllers/CustomizedResumesController");
const PORT = process.env.PORT || 3000;

const app = express();
console.log("API_AUDIENCE:", process.env.API_AUDIENCE);
console.log("API_ISSUERBASEURL:", process.env.API_ISSUERBASEURL);

const checkJwt = auth({
  audience: process.env.API_AUDIENCE,
  issuerBaseURL: process.env.API_ISSUERBASEURL,
  scope: "openid profile email",
});

const usersController = new UsersController(user);
const usersRouter = new UsersRouter(
  express,
  usersController,
  checkJwt
).routes();
const resumesController = new ResumesController(resume, user);
const resumesRouter = new ResumesRouter(
  express,
  resumesController,
  checkJwt
).routes();
const jobApplicationsController = new JobApplicationsController(
  job_application,
  resume,
  customized_resume
);
const jobApplicationsRouter = new JobApplicationsRouter(
  express,
  jobApplicationsController,
  checkJwt
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
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log("Application listening to port 3000");
});
