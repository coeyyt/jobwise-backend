// class UserRouter {
//   constructor(express, controller) {
//     this.express = express;
//     this.controller = controller;
//   }
//   routes() {
//     const router = this.express.Router();
//     router.post(
//       "/",
//       (req, res, next) => {
//         console.log("Request received at /users");
//         next();
//       },
//       this.controller.upsertUser.bind(this.controller)
//     );
//     // router.post("/", this.controller.upsertUser.bind(this.controller));

//     return router;
//   }
// }

// module.exports = UserRouter;
