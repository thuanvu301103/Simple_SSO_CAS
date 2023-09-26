# ```index.js```
1. Run ```index.js```, initial ```app``` by running ```app.js```, the server run on localhost, port 3010.
# ```app.js```
1. Whenever a user enters main page ```http://localhost:3010```, server create ```session``` and use ```ejs``` render to turn template into HTML to response user.
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
2. Whenever a user enters ```http://localhost:3010/cas...```, server runs ```router/index.js```  
```
app.use("/cas", router);
```
# ```router/index.js```
1. Whenever a user enter ```http://localhost:3010/cas/login```, server create 2 routes:
1.1. A GET route that calls the ```login``` function from ```controller/index.js``` object when a GET request is made to ```/login```.
1.2. A POST route that calls the ```doLogin``` function from ```controller/index.js``` object when a POST request is made to ```/login```.
```
router
  .route("/login")
  .get(controller.login)
  .post(controller.doLogin);
```
2. Whenever a user enter ```http://localhost:3010/cas/verifytoken```, server calls the ```verifySsoToken``` function from ```controller/index.js```
```
router.get("/verifytoken", controller.verifySsoToken);
```
# ```router/index.js```
