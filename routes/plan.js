const express = require("express");
const router = express.Router();
const C=require("../controllers/plan")
const {protect,justAdmin}=require("../middleware/auth")

router.post("/makeplan",justAdmin, C.createPlan);

router.post("/vote/:id",protect, C.createVote);

router.get("/planresult",justAdmin,C.getAllPlan)

router.get("/planresultendvote",justAdmin,C.getAllFinishVotePlan)

module.exports = router;
