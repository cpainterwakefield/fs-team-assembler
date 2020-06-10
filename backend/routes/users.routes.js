module.exports = app => {
    const users = require("../controllers/users.controller.js");

    var router = require("express").Router();

    const ADMINauthcheck = (req,res,next)=>{
        if(!req['user']){
            // if user is not logged in this executes
            res.redirect("/");
        }else{
            //If they are logged in
            if(req['user'].user.is_admin){
                next();
            }
            else{
                res.redirect("/");
            }
        }
    }
    // Create a new client
    router.post("/", ADMINauthcheck ,users.create);
    // delete a user
    router.delete("/:id", ADMINauthcheck, users.delete);
    // delete all students from users 
    router.delete("/", ADMINauthcheck, users.deleteStudents);
    //Retrieve user ID from a student
    router.get("/retrieve/:id", ADMINauthcheck, users.retrieve);
    app.use('/api/users', router);
}
