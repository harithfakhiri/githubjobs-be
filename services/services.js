const express = require("express");
const router = express.Router();

const { login, getAllJobs, getJobDetails, register } = require("./../controllers/controllers");

router.post("/login", login);

router.post("/register", register);

router.get("/alljobs", getAllJobs);

router.get("/jobdetails/:id", getJobDetails);



module.exports = router;
