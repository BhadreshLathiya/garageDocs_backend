const express = require("express");
const {
  userRegister,
  getSingleUserDetail,
  updateSingleUserDetail,
  getAllUser,
  deleteSingleUser,
  phoneNumberVerified,
  otpVerifiedUser,
  logOutUser,
} = require("../controllers/userController");
const upload = require("../middelware/fileUpload");
const { verifyToken } = require("../middelware/auth");
const Router = express.Router();

Router.get("/mobile_number_verified", phoneNumberVerified);
Router.post("/otp_verified", otpVerifiedUser);
Router.post("/add_user", upload.single("image"), userRegister);
Router.get("/get_single_detail/:id", verifyToken, getSingleUserDetail);
Router.put(
  "/update_single_user/:id",
  upload.single("image"),
  verifyToken,
  updateSingleUserDetail
);
Router.get("/get_all_user", verifyToken, getAllUser);
Router.delete("/delete_single_user/:id", verifyToken, deleteSingleUser);
Router.put("/log_out_user/:id", verifyToken, logOutUser);

module.exports = Router;
