# fs-team-assembler
#### run 
npm run install
#### In both backend and reconnect directories
#### Then in the reconnect foldier run
npm run build

# How to deploy
1. Clone the repo  
2. In the reconnect foldier, there is a file called .env. Change the link in the quotes to reconnect.mines.edu or whichever domain this runs under.  
3. Run the command 'npm run install' in the reconnect foldier and then run 'npm run build'  
4. Once built a foldier called Dist will be created, Copy this foldier into the backend foldier   
5. Make sure that in server.js the line "require("./routes/routes.google")(app);" should be commented out and the shibboleth line below it should not be commented out.   
6. Apache can now be safely restarted.   