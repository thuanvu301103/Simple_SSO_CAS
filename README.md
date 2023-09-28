# Simple_SSO_CAS
- A simple implementation of single sign-on (SSO) central authorization unit and client using Express.js
- This implement is my customized version of [origin sso cas](https://github.com/ankur-anand/simple-sso). Please read documents from this link, which will give you mỏe information than mine
## Important
- Both SSO server and cosumer server run on localhost
+ SSO server runs on ```http://localhost:3010```
+ Consumer server runs on ```http://localhost:3020```
- You can change the ```port```
## Story
A user want to enter specific resource on consumer server. To do this, that user have to login, the consumer server will redirect user to consumer server. After login, user can has access to all resour that connect to SSO server including resoure on consumer server
## What is different from origin code?
- I have design new UI for consumers
- I have design ```Logout``` function
- However, I haven't a chance to known more about sercurity technique
## Role
### sso-server is our central authorization unit
- Verify the user’s login information.
- Create a global session.
- Create an authorization token.
- Send a token with sso-client communication.
- Verify sso-client token validity.
- Send a JWT with the user information.
### sso-consumer is how different consumer can be implemented to talk with sso-server and use sso feature
- The sso-consumer subsystem does not log in to the user request and jumps to the sso server for authentication.
- Receive the token sent by the sso authentication server.
- Communicate with sso-server to verify the validity of the token.
- Receives a JWT, verifies the JWT using the public key.
- Establish a local session
# Global and Local session
After the user logs in successfully, a session is established with the ```sso authentication server``` and each consumer subsystem. The session established between the user and the ```sso authentication server``` is called a ```global session```. The session established between the user and each ```consumer subsystem``` is called a ```local session```. After the local session is established, the user can access the consumer subsystem protected resources.
# Logout
We can implement the ```Logout```, just we need to consider these three relationship in mind while writing the ```Logout``` Functionality.
1. Local session exists, global session must exist.
2. Global session exists, local session does not necessarily exist.
3. Global session is destroyed, local session must be destroyed:
- If user login through main page, they must close Browser
- If user login through outer page, they can enter ```http://localhost:3010```
