const express = require("express");
const path = require("path");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const app = express();
const port = 3000;

// http logeger
app.use(morgan("combined"));
// template engien

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/news", (req, res) => {
  res.render("news");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
