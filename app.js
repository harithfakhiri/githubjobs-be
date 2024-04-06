const express = require('express')
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

const cors = require('cors');
app.use(cors({exposedHeaders:'Authorization'}));

const services = require("./services/services");
app.use("/api", services);


app.listen(5400, () => console.log('Listening on port 5400'))

