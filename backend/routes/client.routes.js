module.exports = app => {
    const clients = require("../controllers/client.controller.js");

    var router = require("express").Router();

    const authcheck = (req,res,next)=>{
        if(!req['user']){
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

    // Get all the clients
    router.get("/", authcheck, clients.findAll);

    // Find a client by a certain ID
    router.get("/:id", authcheck, clients.findOne);

    // Update a client via a certain ID
    router.put("/:id", authcheck, clients.update);

    // Delete a client with the given ID
    router.delete("/:id", authcheck, clients.delete);

    // Delete all clients (ooo!)
    router.delete("/",authcheck, clients.deleteAll);

    app.use('/api/clients', router);
}
