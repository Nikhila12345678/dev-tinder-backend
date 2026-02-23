#DEV TINDER API's

##Auth router
-post /signup
-post /login
-post /logout

##profile  router
-get/profile/view
-patch/profile/edit
-patch/patch/password

##connection request router
-post/request/send/intrested/:userId
-post/request/send/ignores/userId
-post/request/review/accepted/:requestId
-post/request/review/rejected/:requestId

##user router
get/user/connections
get/user/requests/received
get/user/feed - gets you yhe profile of others on platform