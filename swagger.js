const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node js api project for mongodb",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./src/routers/categoryRouter.js"],
};
module.exports = options;
