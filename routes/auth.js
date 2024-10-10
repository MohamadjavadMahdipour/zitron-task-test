const express = require("express");
const router = express.Router();
const C=require("../controllers/auth")
const {protect}=require("../middleware/auth")

// router.post("/register", C.register); //! farz mikonim register nadarim

router.post("/login", C.login);




module.exports = router;
