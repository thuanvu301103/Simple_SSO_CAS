# What to customize?
# Path
## ```index.js```
1. Run ```index.js```, initial ```app``` by running ```app.js```, the server run on localhost, port 3010.
## ```app.js```
. Whenever a user enters main page ```http://localhost:3010```, server create ```session``` (for user who login by enter main page) and use ```ejs``` render to turn template form ```views/index.ejs```into HTML to response user.
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
## ```views/index.ejs``` 
- First interface when user enter main page of login server (for user who want to login through main page)
- Including link to ```http://localhost:3010/cas/login```
## ```router/index.js```
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
## ```controller/index.js```
1. ```doLogin``` function: ```const doLogin = (req, res, next)```

1.1. Do the validation with email (username) and password
```
const { email, password } = req.body;
if (!(userDB[email] && password === userDB[email].password)) {
  return res.status(404).json({ message: "Invalid username and password" });
}
```
* Note: email (username) and password iss store in excel file ```controller/data.xlsx``` which will be read and stored in variable ```userDB```
  
1.2. If the validation passed, redirect to the User's page as in ```login``` function wwith response message include:

- ```ssoToken```: used for other connection 
- ```id```: user's id
- ```name```: user's name
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
return res.redirect(`${serviceURL}?ssoToken=${intrmid}`);
```
2. ```login``` function: ```const login = (req, res, next)```

2.1. If ```serviceURL != null``` (user enter login page outer page), then check if that outer page is allowed to connect to login server, if not then return error (the allowed URL list is in ```controller/alloweOrigin.js```)

2.2. If ```req.session.user != null``` (user have already logined), then:
- If ```serviceURL == null``` (user enter login page through main page) then redirect to main page
- If ```serviceURL != null``` (user enter login page through outer page) then redirect to (origin) outer page

2.3. If user have not logined yet (```req.session.user == null```) then run ejs render ```views/login.ejs``` and response wih HTML. The user will fill username (email) and password, then submit and send POST message to the server, which will run function ```doLogin```
