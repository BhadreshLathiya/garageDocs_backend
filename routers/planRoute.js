const express = require("express");

const router = express.Router();
const {verifyToken} = require("../middelware/auth");
const { insertSubscription, deleteplan, allPlan, updateplan, getplanBySearch } = require("../controllers/planCotroller");

router.post("/add/plan", verifyToken, insertSubscription);
router.delete("/delete/plan/:id", verifyToken, deleteplan);
router.get("/all/plan", verifyToken, allPlan);
router.put("/update/plan/:id", verifyToken, updateplan);
router.get("/search/plan", verifyToken, getplanBySearch);
// router.get("/allindices",verifyToken,allIndices)

module.exports = router;

