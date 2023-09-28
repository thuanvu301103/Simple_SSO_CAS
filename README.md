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
= Send a JWT with the user information.
### sso-consumer is how different consumer can be implemented to talk with sso-server and use sso feature
- The sso-consumer subsystem does not log in to the user request and jumps to the sso server for authentication.
- Receive the token sent by the sso authentication server.
- Communicate with sso-server to verify the validity of the token.
- Receives a JWT, verifies the JWT using the public key.
- Establish a local session
