// app.js
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./util/geocode");
const forcast = require("./util/forcast");

const port = process.env.PORT || 3000;

const title = "Weather Service";
const app = express();

app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "..\\public")));
const viewPath = path.join(__dirname, "..\\templates\\views");
const partialPath = path.join(__dirname, "..\\templates\\partials");

hbs.registerPartials(partialPath);
app.set("views", viewPath);

app.get("", (req, res) => {
  res.render("index", { title: title, name: "Harish" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: title, name: "Harish" });
});
app.get("/help", (req, res) => {
  res.render("help", { title: title, name: "Harish" });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "address is required" });
    return;
  }

  geoCode.geoCode(req.query.address, (error, data) => {
    if (!error)
      forcast(data.lat, data.long, (error, data) => {
        if (error) return res.send(error);

        //console.log(error);
        console.log(JSON.stringify(data));
        res.send({ temperature: data.temp, precip: data.rain });
      });
    else return res.send(error);
  });

  // res.send({
  //   address: req.query.address,
  //   location: "Bangalore",
  //   temperature: "29C"
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({ error: "Please provide search term" });
    return;
  }
  console.log(req.query);
  res.send([{ name: "nokia", price: 20 }]);
});
app.get("/help/*", (req, res) => {
  res.render("404", { message: "artical not found" });
});

app.get("*", (req, res) => {
  res.render("404", { message: "page not found" });
});
app.listen(port, () => {
  console.log("Server is up..");
});
