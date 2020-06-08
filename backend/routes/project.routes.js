module.exports = app => {
    const projects = require("../controllers/project.controller.js");

    var router = require("express").Router();

    const ADMINauthcheck = (req,res,next)=>{
        if(!req['user'].user){
            // if user is not logged in this executes
            res.redirect("/");
            return;
        }else{
            //If they are logged in
            if(req['user'].user.is_admin){
                next();
                return;
            }
            else{
                res.redirect("/");
                return;
            }
        }
    }

    // Create a new project 
    router.post("/", ADMINauthcheck ,projects.create);

    // Get all the projects 
    router.get("/", ADMINauthcheck, projects.findAll);

    // Find a project by a certain ID
    router.get("/:id", ADMINauthcheck, projects.findOne);

    // Update a project via a certain ID
    router.put("/:id", ADMINauthcheck, projects.update);

    // RUNS ALGORITHM
    router.put("/run", authcheck, projects.run); 

    // Delete a project with the given ID
    router.delete("/:id", ADMINauthcheck, projects.delete);

    // Delete all projects (ooo!)
    router.delete("/", ADMINauthcheck, projects.deleteAll);

    app.use('/api/projects', router);
}
