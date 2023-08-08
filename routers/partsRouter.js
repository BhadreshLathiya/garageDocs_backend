const express = require("express");
const { verifyToken } = require("../middelware/auth");
const {
  addPart,
  addPartDetailByUser,
  getAllPartForUser,
  getAllPartForAdmin,
  getSinglePartDetailByUser,
  getSinglePart,
  updateSinglePartDetailByUser,
  updateSinglePartByAdmin,
  deleteSinglePartDetailInPartDetail,
  deleteSinglePartInPart,
} = require("../controllers/partsController");
const Router = express.Router();

Router.post("/add_part/:id", verifyToken, addPart);
Router.post("/add_part_detail_by_user/:id", verifyToken, addPartDetailByUser);
Router.get("/get_all_part_for_user/:id", verifyToken, getAllPartForUser);
Router.get("/get_all_part_for_admin", verifyToken, getAllPartForAdmin);
Router.get("/get_single_part/:id", verifyToken, getSinglePart);
Router.get(
  "/get_single_part_detail_by_user/;id",
  verifyToken,
  getSinglePartDetailByUser
);
Router.update(
  "/update_single_part_detail_by_user/:id",
  verifyToken,
  updateSinglePartDetailByUser
);
Router.update(
  "/update_single_part_by_admin/:id",
  verifyToken,
  updateSinglePartByAdmin
);

Router.delete(
  "/delete_single_part_detail_in_part_detail/:id",
  verifyToken,
  deleteSinglePartDetailInPartDetail
);
Router.update(
  "/delete_single_part_in_part_/:id",
  verifyToken,
  deleteSinglePartInPart
);

module.exports = Router;
