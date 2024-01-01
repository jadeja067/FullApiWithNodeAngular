const express = require("express");
const router = express.Router();
const users = require("../../control/user");
router
  .post("/signin", users.singin)
  .post("/signup", users.singup)
  .post("/sendmail", users.sendMail)
  .patch("/changePassword", users.changePassword);

exports.router = router;
