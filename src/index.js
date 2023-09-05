const express = require("express");
const path = require("path");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const route = require("./routes");
const methodOverride = require("method-override");
const db = require("./config/db");

const SortMiddleware = require("./app/middlewares/sortMiddleware");

// connext db
db.connect();

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use(methodOverride("_method"));
app.use(SortMiddleware);

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
      sortable: function (field, sort) {
        const sortType = field === sort.column ? sort.type : "default";

        const icons = {
          default: "fa-solid fa-sort",
          asc: "fa-solid fa-arrow-down-short-wide",
          desc: "fa-solid fa-arrow-down-wide-short",
        };

        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `
        <a href="?_sort&column=${field}&type=${type}">
          <i class="${icon}"></i>
        </a>
      `;
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
