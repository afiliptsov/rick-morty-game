require("dotenv").config(); //Add ENV file

const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");

const controller = require("./controller/controller"); //Importing Server Controllers

const port = process.env.PORT || 3001;

const app = express();
app.use(json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));

massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
}); //Setting up DATABASE

app.get("/api/leaderboard", controller.getScore);
app.post("/api/score", controller.createScore);

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
