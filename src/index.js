const express = require("express");
const path = require("path");
const morgan = require("morgan");
const hbs = require("express-handlebars");

const route = require("./routes");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
// http logeger
// app.use(morgan("combined"));
// template engien

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
