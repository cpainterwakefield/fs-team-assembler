module.exports = app => {
    const prefer_teammates = require("../controllers/prefer_teammate.controller.js");

    var router = require("express").Router();

    const authcheck = (req,res,next)=>{
                next(); // COMMENT OUT -- ONLY FOR DEV
        if(!req.user){
            // if user is not logged in this executes
            res.redirect("/auth/login");
        }else{
            //If they are logged in
            if(req.user.is_admin){
                next();
            }
            else{
                res.redirect("/auth/login");
            }
        }
    }

    // Create a new prefer_teammate 
    router.post("/", authcheck ,prefer_teammates.create);

    // Get all the prefer_teammates 
    router.get("/", authcheck, prefer_teammates.findAll);

    // Find a prefer_teammate by a certain ID
    router.get("/:id", authcheck, prefer_teammates.findOne);

    // Update a prefer_teammate via a certain ID
    router.put("/:id", authcheck, prefer_teammates.update);

    // Delete a prefer_teammate with the given ID
    router.delete("/:id", authcheck, prefer_teammates.delete);

    // Delete all prefer_teammates (ooo!)
    router.delete("/", authcheck, prefer_teammates.deleteAll);

    app.use('/api/prefer_teammate', router);
}

