const Sequelize = require("sequelize");
const bcrypt = require("bcrypt")


const sequelize = new Sequelize("dansjobs", "harith", "testest123", {
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => {
    console.log("error connecting to database");
  });

const User = sequelize.define(
  "user",
  {
    username: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hash);
      },
    },
  },
  {
    timestamps: false, // Exclude createdAt and updatedAt columns
  }
);

User.sync()
  .then((data) => {
    console.log("Table and model synced successfully");
  })
  .catch((err) => {
    console.log("Error in syncing the table and model");
  });

module.exports = { User};
