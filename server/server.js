require("dotenv").config();

const app = require("express")();

const { port } = require("./src/config/app");
app.listen(port, () => console.log(`Server started on ${port} port`));