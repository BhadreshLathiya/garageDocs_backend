const express = require("express");

const { verifyToken } = require("../middelware/auth");
const { sumOfPrice } = require("../controllers/accountController");
const router = express.Router();

router.get("/sum/ammount/:id", verifyToken, sumOfPrice);

module.exports = router;
