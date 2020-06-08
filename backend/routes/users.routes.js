module.exports = app => {
    const clients = require("../controllers/users.controller.js");

    var router = require("express").Router();

    const authcheck = (req,res,next)=>{
        if(!req['user'].user){
            // if user is not logged in this executes
            res.redirect("/");
        }else{
            //If they are logged in
            if(req.user.is_admin){
                next();
            }
            else{
                res.redirect("/");
            }
        }
    }

    // Create a new client
    router.post("/", authcheck ,clients.create);
    app.use('/api/users', router);
}
