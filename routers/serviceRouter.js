const express = require("express");
const { verifyToken } = require("../middelware/auth");
const {
  addServiceforSingleUser,
  getAllServiceforSingleUser,
  getSingleServiceDetailforsingleUser,
  updateSingleServiceDetailforsingleUser,
  deleteSingleServiceDetailforsingleUser,
} = require("../controllers/serviceController");
const Router = express.Router();

Router.post(
  "/add_service_for_single_user/:id",
  verifyToken,
  addServiceforSingleUser
);
Router.get(
  "/get_all_services_for_single_user/:id",
  verifyToken,
  getAllServiceforSingleUser
);
Router.get(
  "/get_single_service_detail_for_single_user/:id",
  verifyToken,
  getSingleServiceDetailforsingleUser
);
Router.put(
  "/update_single_service_detail_for_single_user/:id",
  verifyToken,
  updateSingleServiceDetailforsingleUser
);

Router.delete(
  "/delete_single_service_detail_for_single_user/:id",
  verifyToken,
  deleteSingleServiceDetailforsingleUser
);

module.exports = Router;
