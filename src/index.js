const express = require("express");
const path = require("path");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const route = require("./routes");
const methodOverride = require("method-override");
const db = require("./config/db");

// connext db
db.connect();

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "/public")));
// http logeger
// app.use(morgan("combined"));
// template engien

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    helpers: {
      sum: function (a, b) {
        return a + b;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
