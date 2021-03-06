module.exports = app => {
    const students = require("../controllers/student.controller.js");

    var router = require("express").Router();

    const authcheck = (req,res,next)=>{
        if(!req['user']){
            // if user is not logged in this executes
            res.redirect("/");
        }else{
            //If they are logged in
            next();
        }
    }
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
    //Get the current student id
    router.get("/retrieve/:email", authcheck, students.retrieve);

    // Create a new student 
    router.post("/", ADMINauthcheck ,students.create);

    // Get all the students 
    router.get("/", authcheck, students.findAll);

    // Get count of all students
    router.get("/countAll", ADMINauthcheck, students.countAll);

    // Get count of all students with team pref 
    router.get("/countTeam", ADMINauthcheck, students.countTeam);

    // Get count of all students with proj pref
    router.get("/countProj", ADMINauthcheck, students.countProj);

    // Get count of all students with no pref
    router.get("/countNoPref", ADMINauthcheck, students.countNoPref);

    // Get count of all students who have filled out data
    router.get("/countSubmitted", ADMINauthcheck, students.countSubmitted);

    // Get count of all students who chose project and got a project they preferred`
    router.get("/countProjInPref", ADMINauthcheck, students.countProjInPref);

    // Get count of all students who chose project and got their first choice`
    router.get("/countFirstProj", ADMINauthcheck, students.countFirstProj);

    // Get count of all students who chose project and got their second choice`
    router.get("/countSecondProj", ADMINauthcheck, students.countSecondProj);

    // Get count of all students who chose project and got their third choice`
    router.get("/countThirdProj", ADMINauthcheck, students.countThirdProj);

    // Get count of all students who chose team and got a teammate they preferred`
    router.get("/countTeam1Mem", ADMINauthcheck, students.countTeam1Mem);

    // Get count of all students who chose no pref and got a teammate or project they preferred`
    router.get("/countNoPrefTeamOrProj", ADMINauthcheck, students.countNoPrefTeamOrProj);

    // Find a student by a certain ID
    router.get("/:id", authcheck, students.findOne);

    // Update a student via cookie ID
    router.put("/:id", authcheck, students.update);
    // Update a student via a certain ID
    router.put("/id/:id", authcheck, students.updateTwo);

    // Delete a student with the given ID
    router.delete("/:id", ADMINauthcheck, students.delete);

    // Delete all students (ooo!)
    router.delete("/", ADMINauthcheck, students.deleteAll);

    app.use('/api/students', router);
}
