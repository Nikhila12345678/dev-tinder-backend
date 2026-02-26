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
-post/request/send/status/:userId
-post/request/review/status/:requestId

##user router
get/user/requests
get/user/connections
get/user/feed - gets you yhe profile of others on platform

-feed?page=1&limit=10 => first 10 users 1-10
-feed?page=2&limit=10 => 11-20 => .skip(10) & .limit
-feed?page=3&limit=10 => 11-20 => .skip(20) & .limit(10)


.skip(0) & .limit(10) -->skips 0 users and limits 10