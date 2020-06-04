module.exports = app => {
    const projects = require("../controllers/project.controller.js");

    var router = require("express").Router();

    const authcheck = (req,res,next)=>{
                next(); // COMMENT OUT -- ONLY FOR DEV
/*        if(!req.user){
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
        }*/
    }

    // Create a new project 
    router.post("/", authcheck ,projects.create);

    // Get all the projects 
    router.get("/", authcheck, projects.findAll);

    // Find a project by a certain ID
    router.get("/:id", authcheck, projects.findOne);

    // Update a project via a certain ID
    router.put("/:id", authcheck, projects.update);

    // Delete a project with the given ID
    router.delete("/:id", authcheck, projects.delete);

    // Delete all projects (ooo!)
    router.delete("/", authcheck, projects.deleteAll);

    app.use('/api/projects', router);
}
