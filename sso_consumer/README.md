
# ```index.js```
1. Run ```index.js```, initial ```app``` by running ```app.js```, the consumer server run on localhost, port 3020.
# ```app.js```
1. Whenever a user enters main page ```http://localhost:3020```   
1.1. Consumer Server create ```session``` and use ```ejs``` render to turn template into HTML to response user.
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
1.2. Cosumer Server runs ```checkSSORedirect``` object
```
const checkSSORedirect = require("./checkSSORedirect");
app.use(checkSSORedirect());
```
2. Whenever a user enters ```http://localhost:3010/cas...```, server runs ```router/index.js```  
```
app.use("/cas", router);
```
# ```checkSSORedirect.js```

# ```router/index.js```
1. Whenever a user enter ```http://localhost:3010/cas/login```, server create 2 routes:
1.1. A GET route that calls the ```login``` function from ```controller/index.js``` object when a GET request is made to ```/login``` (login form other page not in server)
1.2. A POST route that calls the ```doLogin``` function from ```controller/index.js``` object when a POST request is made to ```/login``` (login from main page of server)
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
   
1.1. Do the validation with email (username) and password
```
const { email, password } = req.body;
if (!(userDB[email] && password === userDB[email].password)) {
  return res.status(404).json({ message: "Invalid username and password" });
}
```
* Note: email (username) and password iss store in excel file ```controller/data.xlsx``` which will be read and stored in variable ```userDB```
  
1.2. If the validation passed, redirect to the User's page
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
2. ```login``` function: ```const login = (req, res, next)```: The req.query will have the redirect url where we need to redirect after successful login and with sso token. This can also be used to verify the origin from where the request has came in for the redirection
