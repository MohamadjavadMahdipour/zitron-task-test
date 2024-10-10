const express = require("express");
const router = express.Router();
const auth=require("./auth")
const plan=require("./plan")

router.use("/auth",auth);

router.use("/plan",plan)

module.exports = router;
