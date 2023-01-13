const express = require("express");
const helmet = require("helmet");
const app = express();
const ejs = require("ejs");
const db = require("./model/db");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/public", express.static(__dirname + "/public"));

//app.use(helmet()); -- 편의성을 위해 주석
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mainRouter = require("./router/mainRounter");
app.use("/", mainRouter);

app.listen(3000, function (req, res) {
  db.sequelize.sync({ force: false });
  console.log("서버 start");
});
