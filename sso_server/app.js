const express = require("express");
const morgan = require("morgan");
const app = express();
const engine = require("ejs-mate");
const session = require("express-session");
const router = require("./router");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  console.log(req.session);
  next();
});
// Static directory for ejs file
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));
app.engine("ejs", engine);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use("/cas", router);
app.get("/", (req, res, next) => {
  const user = req.session.user || "unlogged";
  res.render("index", {
    what: `HCMUT_SSO authentication Server - User: ${user}`,
    title: "HCMUT_SSO authentication Server | Home",
  });
});

app.use((req, res, next) => {
  // catch 404 and forward to error handler
  const err = new Error("Resource Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error({
    message: err.message,
    error: err,
  });
  const statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (statusCode === 500) {
    message = "Internal Server Error";
  }
  res.status(statusCode).json({ message });
});

module.exports = app;
