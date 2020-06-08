module.exports = app => {
    const students = require("../controllers/student.controller.js");

    var router = require("express").Router();

    const authcheck = (req,res,next)=>{
        if(!req['user'].student){
            // if user is not logged in this executes
            res.redirect("/");
            return;
        }else{
            //If they are logged in
            next();
        }
        res.redirect("/");
        return;
    }
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
    //Get the current student id
    router.get("/retrieve", authcheck, students.retrieve);

    // Create a new student 
    router.post("/", ADMINauthcheck ,students.create);

    // Get all the students 
    router.get("/", ADMINauthcheck, students.findAll);

    // Find a student by a certain ID
    router.get("/:id", authcheck, students.findOne);

    // Update a student via a certain ID
    router.put("/:id", authcheck, students.update);

    // Delete a student with the given ID
    router.delete("/:id", ADMINauthcheck, students.delete);

    // Delete all students (ooo!)
    router.delete("/", ADMINauthcheck, students.deleteAll);

    app.use('/api/students', router);
}
