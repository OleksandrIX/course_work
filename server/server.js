require("dotenv").config();
require("./src/db/connect.db");
require("./src/db/sync.db");

const app = require("express")();

const appMiddleware = require("./src/middlewares/app.middleware");
const authMiddleware = require("./src/middlewares/auth.middleware");
app.use(appMiddleware, authMiddleware);

const routes = require("./src/APIv1/routes");
app.use("/api/v1", routes);

const errorMiddleware = require("./src/middlewares/error.middleware");
app.use(errorMiddleware);

const { port } = require("./src/configs/app.config");
app.listen(port, () => console.log(`Server started on ${port} port`));