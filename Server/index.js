require("dotenv").config(); //Add ENV file

const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const axios = require("axios");

const controller = require("./controller/controller"); //Importing Server Controllers

const port = process.env.PORT || 3001;

const app = express();
app.use(json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));

let charArr = [];

const baseRickUrl = "https://rickandmortyapi.com/api/";
const page1 = "character/?page=1";
const page2 = "character/?page=2";
const page3 = "character/?page=3";
const page4 = "character/?page=4";
const page5 = "character/?page=5";
const page6 = "character/?page=6";
const page7 = "character/?page=7";
const page8 = "character/?page=8";
const page9 = "character/?page=9";
const page10 = "character/?page=10";
const page11 = "character/?page=11";
const page12 = "character/?page=12";
const page13 = "character/?page=13";
const page14 = "character/?page=14";
const page15 = "character/?page=15";
const page16 = "character/?page=16";
const page17 = "character/?page=17";
const page18 = "character/?page=18";
const page19 = "character/?page=19";
const page20 = "character/?page=20";
const page21 = "character/?page=21";
const page22 = "character/?page=22";
const page23 = "character/?page=23";
const page24 = "character/?page=24";
const page25 = "character/?page=25";

massive(process.env.CONNECTION_STRING).then(db => {
  //Setting up DATABASE
  app.set("db", db);
  console.log("DATABASE CONNECTED");

  //Setting up characters
  axios
    .all([
      axios.get(baseRickUrl + page1),
      axios.get(baseRickUrl + page2),
      axios.get(baseRickUrl + page3),
      axios.get(baseRickUrl + page4),
      axios.get(baseRickUrl + page5),
      axios.get(baseRickUrl + page6),
      axios.get(baseRickUrl + page7),
      axios.get(baseRickUrl + page8),
      axios.get(baseRickUrl + page9),
      axios.get(baseRickUrl + page10),
      axios.get(baseRickUrl + page11),
      axios.get(baseRickUrl + page12),
      axios.get(baseRickUrl + page13),
      axios.get(baseRickUrl + page14),
      axios.get(baseRickUrl + page15),
      axios.get(baseRickUrl + page16),
      axios.get(baseRickUrl + page17),
      axios.get(baseRickUrl + page18),
      axios.get(baseRickUrl + page19),
      axios.get(baseRickUrl + page20),
      axios.get(baseRickUrl + page21),
      axios.get(baseRickUrl + page22),
      axios.get(baseRickUrl + page23),
      axios.get(baseRickUrl + page24),
      axios.get(baseRickUrl + page25)
    ])
    .then(
      axios.spread(
        (
          page1,
          page2,
          page3,
          page4,
          page5,
          page6,
          page7,
          page8,
          page9,
          page10,
          page11,
          page12,
          page13,
          page14,
          page15,
          page16,
          page17,
          page18,
          page19,
          page20,
          page21,
          page22,
          page23,
          page24,
          page25
        ) => {
          charArr = [
            ...page1.data.results,
            ...page2.data.results,
            ...page3.data.results,
            ...page4.data.results,
            ...page5.data.results,
            ...page6.data.results,
            ...page7.data.results,
            ...page8.data.results,
            ...page9.data.results,
            ...page10.data.results,
            ...page11.data.results,
            ...page12.data.results,
            ...page13.data.results,
            ...page14.data.results,
            ...page15.data.results,
            ...page16.data.results,
            ...page17.data.results,
            ...page18.data.results,
            ...page19.data.results,
            ...page20.data.results,
            ...page21.data.results,
            ...page22.data.results,
            ...page23.data.results,
            ...page24.data.results,
            ...page25.data.results
          ];
        }
      )
    );
});

app.get("/api/characters", (req, res) => {
  res
    .json(charArr)
    .status(200)
    .send();
});

app.get("/api/leaderboard", controller.getScore);
app.post("/api/score", controller.createScore);

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
