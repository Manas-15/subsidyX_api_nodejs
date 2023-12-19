const express = require("express");
require("./db/conn");
const authRouter = require("./routers/authRouter");
const categoryRouter = require("./routers/categoryRouter");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(categoryRouter);

app.listen(PORT, () => {
  console.log(`localhost running ${PORT}`);
});
