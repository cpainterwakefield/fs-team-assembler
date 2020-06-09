module.exports = app => {
    const avoid_teammates = require("../controllers/avoid_teammate.controller.js");

    var router = require("express").Router();

    const authcheck = (req,res,next)=>{
next();
/*        if(!req['user']){
            // if user is not logged in this executes
            res.redirect("/");
        }else{
            //If they are logged in
            next();
        }
 */   }

    // Create a new avoid_teammate 
    router.post("/", authcheck ,avoid_teammates.create);

    // Get all the avoid_teammates 
    router.get("/", authcheck, avoid_teammates.findAll);

    // Find a avoid_teammate by a certain ID
    router.get("/:id", authcheck, avoid_teammates.findOne);

    // Update a avoid_teammate via a certain ID
    router.put("/:id", authcheck, avoid_teammates.update);

    // Delete a avoid_teammate with the given ID
    router.delete("/:id", authcheck, avoid_teammates.delete);

    // Delete all avoid_teammates (ooo!)
    router.delete("/", authcheck, avoid_teammates.deleteAll);

    app.use('/api/avoid_teammate', router);
}

