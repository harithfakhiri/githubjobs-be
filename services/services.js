const express = require("express");
const router = express.Router();

const { login, getAllJobs, getJobDetails } = require("./../controllers/controllers");

router.post("/login", login);

router.get("/alljobs", getAllJobs);

router.get("/jobdetails/:id", getJobDetails);



module.exports = router;
