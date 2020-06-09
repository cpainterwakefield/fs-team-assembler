module.exports = app => {
    const run = require("../controllers/run.controller.js");

    var router = require("express").Router();

    const ADMINauthcheck = (req,res,next)=>{
next();
/*        if(!req['user']){
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
*/    }

    // RUNS ALGORITHM
    router.put("/", ADMINauthcheck, run.run); 

    app.use('/api/run', router);
}
