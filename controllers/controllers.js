const Joi = require("joi");
const axios = require("axios");
const { User } = require("../models/models");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const loginScheme = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(3).required(),
});

const register = async (req, res) => {
  const { username, password } = req.body;
  const loginValidation = loginScheme.validate({
    username: username,
    password: password,
  });
  // send any error to the user in case of any
  if (loginValidation.error) {
    res.status(400).send(loginValidation.error.details[0].message);
    return;
  }
  console.log("here1");
  try {
    console.log(username, password)
    const user = await User.create({
      username,
      password,
    });
    
    res.status(200).json({ success_msg: "successfully registered." });
  } catch (error) {
    console.log("here3");

    console.error("Error registering user:", error); // Log the error for debugging

    res.status(500).json({ error: "Failed to register user" }); // Send a generic error message to the client
  }
};


const login = async (req, res) => {
  console.log("here");
  const { username, password } = req.body;
  // In real-world scenario, you would verify user credentials
  const loginValidation = loginScheme.validate({
    username: username,
    password: password,
  });

  if (loginValidation.error) {
    // Validation failed
    res.status(400).json({ err_msg: loginValidation.error.details[0].message });
  } else {
    // Validation succeeded
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      res.status(404).json({ err_msg: "Invalid email or password" });
      return;
    }
    // validate password
    const valid_pass = await bcrypt.compare(password, user.password);
    if (!valid_pass) {
      res.status(400).json({ err_msg: "Invalid email or password" });
      return;
    }
    console.log(process.env.AUTH_TOKEN_SECRET);
    const jwtExpirySeconds = 18000;
    const token = jwt.sign({ id: user.id }, process.env.AUTH_TOKEN_SECRET, {
      expiresIn: jwtExpirySeconds,
    });


    // Send the token in the Authorization header
    res.setHeader('Authorization', `${token}`, 'Access-Control-Allow-Headers');
    res.status(200).json({ success_msg: "login succesful" });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const response = await axios.get(
      "https://dev6.dansmultipro.com/api/recruitment/positions.json"
    );
    const positions = response.data;
    res.status(200).json(positions);
  } catch (error) {
    console.error("Error fetching positions:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getJobDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(
      "https://dev6.dansmultipro.com/api/recruitment/positions/" + id
    );
    const positions = response.data;
    res.status(200).json(positions);
  } catch (error) {
    console.error("Error fetching positions:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, login, getAllJobs, getJobDetails };
