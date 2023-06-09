require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/public", express.static(path.join(__dirname, "src/public")));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const routes = require("./src/routes");
app.use(routes);

const appConfig = require("./src/config/app");
app.listen(appConfig.port, () => {
    console.log(`App started on ${appConfig.port} port`);
});