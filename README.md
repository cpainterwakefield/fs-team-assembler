# fs-team-assembler
#### run 
npm run install
#### In both backend and reconnect directories
#### Then in the reconnect foldier run
npm run build
### To get the build
### This will create a foldier called dist that should be copied into the backend
### Once the dist foldier from reconnect is in the backend open Server.js in a text exitor
### There will be a list of require('route') statements starting at line 78
### Make sure that require("./routes/routes.google")(app); is commented out
# Once this is done you are safe to restart Apache


# How to deploy
1. Clone the repo and run npm run install in both backend and reconnect foldiers  
2. In the foldier named Reconnect run 'npm run build' and wait for it to build  
3. Once built a foldier called Dist will be created, Copy this foldier into the backend foldier  
4. Make sure that in server.js the line require("./routes/routes.google")(app); should be commented out and the shibboleth line below it should not be commented out. 
4. Apache can now be safely restarted.  