const express = require("express");
const router = express.Router();
const db = require("../model/db.js");

router.get("/", function (req, res) {
  res.render("main", { title: "영화 리뷰 사이트" });
});

// http://localhost:3000/getApi?page=1
router.get("/getApi", function (req, res) {
  let page = req.query.page;
  console.log("page : " + page);
  res.send({ key: "value" });
});

// POSTMAN - http://localhost:3000/postApi
router.post("/postApi", function (req, res) {
  let body = req.body;
  console.log(body);
  res.send("POST API");
});

router.get("/about", function (req, res) {
  res.send("About Send");
});

/**
 * CRUD 생성
 */
router.get("/data/create", function (req, res) {
  let user_id = parseInt(Math.random() * 10000);
  db.users.create({ user_id: user_id }).then(function (result) {
    res.send({ success: 200 });
  });
});

router.get("/data/read", function (req, res) {
  db.users.findAll().then(function (result) {
    res.send({ success: 200, data: result });
  });
});

router.post("/data/update", function (req, res) {
  console.log(req.body.target_id);
  let target_id = req.body.target_id;
  db.users
    .update({ user_id: 9999 }, { where: { user_id: target_id } })
    .then(function (result) {
      res.send({ success: 200 });
    });
});

router.post("/data/delete", function (req, res) {
  let target_id = req.body.target_id;
  db.users.destroy({ where: { user_id: target_id } }).then(function () {
    res.send({ success: 200 });
  });
});

module.exports = router;
