const express = require("express");
require("./db/conn");
const PORT = process.env.PORT || 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerOptions = require("../swagger");

const authRouter = require("./routers/authRouter");
const categoryRouter = require("./routers/categoryRouter");
const sectorRouter = require("./routers/sectorRouter");
const stateRouter = require("./routers/stateRouter");
const districtRouter = require("./routers/districtRouter");
const talukaRouter = require("./routers/talukaRouter");
const departmentRouter = require("./routers/departmentRouter");
const questionRouter = require("./routers/questionRouter");

const app = express();

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// /**
//  * @swagger
//  * /:
//  *  get:
//  *      summary: This api is used to check if GET method is working or not
//  *      description: This is description
//  *      responses:
//  *           200:
//  *                description: To test description
//  */

// app.get("/", (req, res) => {
//   res.send("welcome Santosh");
// });

app.use(express.json());
app.use(authRouter);
app.use(categoryRouter);
app.use(sectorRouter);
app.use(stateRouter);
app.use(districtRouter);
app.use(talukaRouter);
app.use(departmentRouter);
app.use(questionRouter);

app.listen(PORT, () => {
  console.log(`localhost running ${PORT}`);
});
