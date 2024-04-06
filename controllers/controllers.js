const Joi = require("joi");
const axios = require("axios");

const loginScheme = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(3).required(),
});

const login = async (req, res) => {
  const { username, password } = req.body;
  // In real-world scenario, you would verify user credentials
  const loginValidation = loginScheme.validate({
    username: username,
    password: password,
  });
  if (loginValidation.error) {
    // Validation failed
    res.status(400).send(loginValidation.error.details[0].message);
  } else {
    // Validation succeeded
    console.log("Validation passed");
    res.status(200).json({ success_msg: "login succesful" });
  }
  // if (username === 'user' && password === 'password') {
  //   const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  //   res.json({ token });
  // } else {
  //   res.status(401).json({ message: 'Invalid credentials' });
  // }
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
    const id = req.params.id
    try {
      const response = await axios.get(
        "https://dev6.dansmultipro.com/api/recruitment/positions/"+id
      );
      const positions = response.data;
      res.status(200).json(positions);
    } catch (error) {
      console.error("Error fetching positions:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = { login, getAllJobs, getJobDetails };
