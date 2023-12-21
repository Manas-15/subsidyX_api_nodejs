const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node js api project for SubsidyX(learning)",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "Endpoints related to user authentication",
      },
      {
        name: "Categories",
        description: "Endpoints related to product categories",
      },
      {
        name: "Sectors",
        description: "Endpoints related to product sectors",
      },
    ],
  },
  apis: [
    "./src/routers/authRouter.js",
    "./src/routers/categoryRouter.js",
    "./src/routers/sectorRouter.js",
  ],
};
module.exports = options;

