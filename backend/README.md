## Installing
```
$ npm install
```

## Running
```
$ npm run start  
```

## Files
* `algorithm/` - team selection algorithm source code
* `db_scripts/` - scripts for setting up test database (not necessary to run application)
* `config/` - database and authentication config files
* `server.js` - the "main" program to run
* `routes` - this is where the API calls are declared along with all the shibboleth auth code
* `controllers` - this is where the code that runs the API calls is located
* `config` - This is where the secret files are.
* `config/keys.js` - this contains the key that encrypts all the cookies sent to the user
* `config/db.config.js` - This contains login credentials to the database
* `config/shib_config.js` - this contains the route that PassportJS lives on

## PASSPORTJS
All of passportJS lives in routes/shiboleth.routes.js. Serialize/deserialize functions deal with giving a cookie and retrieving a cookie from the user.  
The logic for what to do with login information is starts at line 39 where new Custom Strategy is declared.  
At the bottom of the file are routes used by passport. The route is retrieved from shib_config.js.
The get function is the first one to trigger and it is followed by the post route. This is also where admins are sent to admin and students are sent to students.  
The last route is a logout that invalidates the Passport cookie not the shibboleth cookie.  

## Locking down admin/student API calls
Below is an example of a route that is locked down  
* app.get('/student', authcheck,function(requests, response){  
The body has been left out since it does not contribute to locking it down.  
This route is for '/student' and it is locked down using authcheck. There are two versions authcheck and ADMINauthcheck.  
Due to the nature of these functions all ADMINs can use/see all things under the authcheck.  

If you have any questions about logic in the code feel free to contact me.
