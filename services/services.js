const express = require("express");
const router = express.Router();

const { login, getAllJobs, getJobDetails, register, searchJobs } = require("./../controllers/controllers");
const { auth } = require("../middleware/auth");

router.post("/login", login);

router.post("/register", register);

router.get("/alljobs", auth , getAllJobs);

router.get("/searchjobs", auth , searchJobs);

router.get("/jobdetails/:id", auth, getJobDetails);



module.exports = router;
