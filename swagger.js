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
      {
        name: "States",
        description: "Endpoints related to states",
      },
      {
        name: "Districts",
        description: "Endpoints related to districts",
      },
    ],
  },
  apis: [
    "./src/routers/authRouter.js",
    "./src/routers/categoryRouter.js",
    "./src/routers/sectorRouter.js",
    "./src/routers/stateRouter.js",
    "./src/routers/districtRouter.js",
  ],
};
module.exports = options;
