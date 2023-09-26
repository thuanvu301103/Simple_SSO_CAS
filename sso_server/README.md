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
# ```controller/index.js```
1. ```doLogin``` function: ```const doLogin = (req, res, next)```
1.1. Do the validation with email and password
```
const { email, password } = req.body;
if (!(userDB[email] && password === userDB[email].password)) {
  return res.status(404).json({ message: "Invalid username and password" });
}
```
* Note: email and password iss store in excel file ```controller/data.xlsx``` which will be read and stored in variable ```userDB```
  
1.2. If the validation failed, return to the User's page
```
const { serviceURL } = req.query;
const id = encodedId();
req.session.user = id;
sessionUser[id] = email;
if (serviceURL == null) {
  return res.redirect("/");
}
const url = new URL(serviceURL);
const intrmid = encodedId();
storeApplicationInCache(url.origin, id, intrmid);
```
