# ```index.js```
1. Run ```index.js```, initial ```app``` by running ```app.js```, the server run on localhost, port 3010.
# ```app.js```
1. When ever a user enters main page ```http://localhost:3010```, server create ```session``` and use ```ejs``` render to turn template into HTML to response user.
```
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.engine("ejs", engine);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
```
2. When ever a user enters ```http://localhost:3010/cas...```, server runs ```router/index.js```  
```
app.use("/cas", router);
```
# ```router/index.js```
1. Server create 2 routes for path ```http://localhost:3010/cas/login```
1.1. A GET route that calls the ```login``` function from your ```controller``` object when a GET request is made to ```/login```.
1.2. A POST route that calls the ```doLogin``` function from your ```controller``` object when a POST request is made to ```/login```.
```
router
  .route("/login")
  .get(controller.login)
  .post(controller.doLogin);
```
# ```router/index.js```
