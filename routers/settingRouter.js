const express = require("express");
const { verifyToken } = require("../middelware/auth");
const {
  addSetting,
  editSetting,
  deleteSetting,
  getSetting,
} = require("../controllers/settingController");

const Router = express.Router();

Router.post("/add/settings", verifyToken, addSetting);
Router.put("/edit/settings/:id", verifyToken, editSetting);
Router.delete("/delete/settings/:id", verifyToken, deleteSetting);
Router.get("/get/settings", verifyToken, getSetting);

module.exports = Router;
