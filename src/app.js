const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getWeather = require("../utils/weather");
const getLocation = require("../utils/location");

const indexFile = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../views/partials");
const app = express();

hbs.registerPartials(partialsPath);

app.set("view engine", "hbs");
app.use(express.static(indexFile));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Gabriel Merlin",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Gabriel Merlin",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Gabriel Merlin",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  const { address } = req.query;
  getLocation(address, (error, location) => {
    if (error) {
      res.send({ error });
    } else {
      getWeather(location.latitude, location.longitude, (error, forecast) => {
        if (error) {
          res.send({ error });
        } else {
          res.send({ ...forecast, location: address });
        }
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Help Article Not Found",
    name: "Gabriel Merlin",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Page Not Found",
    name: "Gabriel Merlin",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
