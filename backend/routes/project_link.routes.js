module.exports = app => {
    const project_link = require("../controllers/project_link.controller.js");

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

*/    }

    // Create a new project 
    router.post("/", authcheck ,project_link.create);

    // Get all the project_link 
    router.get("/", authcheck, project_link.findAll);

    // Find a project by a certain ID
    router.get("/:id", authcheck, project_link.findOne);

    // Update a project via a certain ID
    router.put("/:id", authcheck, project_link.update);

    // Delete a project with the given ID
    router.delete("/:id", authcheck, project_link.delete);

    // Delete all project_link (ooo!)
    router.delete("/", authcheck, project_link.deleteAll);

    app.use('/api/project_link', router);
}
