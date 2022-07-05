const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;
const { sequelize } = require("./lib/sequelize");
const { postRoutes, userRoutes } = require("./routes");
sequelize.sync({ alter: true });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/post", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log("server is running in port " + PORT);
});