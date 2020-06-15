const express	=	require("express");
const router	=	express.Router();
const Task = require("../models/task");
const middleware = require("../middleware");
//////////////////////////
//// TASKS ROUTES //
////////////////////////

//INDEX - show all tasks
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Task.find({}, function(err, allTasks){
       if(err){
           console.log(err);
       } else {
          res.render("tasks/index",{tasks: allTasks, page: 'tasks'});
       }
    });
});

//Posts a new task
router.post("/", middleware.isLoggedIn, function(req, res){
    //Get data from form and add to tasks array
    const name = req.body.name;
	const desc = req.body.description;
	const author = {
		id: req.user._id,
		username: req.user.username
	};
    const newTask = {name: name, description: desc, author:author}
	console.log(req.user);
    Task.create(newTask, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			 res.redirect("/tasks");
		}
	});
   
});

//Create new task form 
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("./tasks/new");
});

//Shows Task by id
router.get("/:id", function(req,res){
		Task.findById(req.params.id).populate("comments").exec(function(err, foundTask){
		if(err){
			console.log(err);
		} else {
		res.render("./tasks/show", {task: foundTask});
							}
		});
});

//Edit Task Route 
router.get("/:id/edit", middleware.checkTaskOwnership, function(req,res){
    //is user logged in?  
        if(req.isAuthenticated()){
               Task.findById(req.params.id, function(err, foundTask){                 
                          res.render("tasks/edit", {task: foundTask});                 
        });
        }
});

//Update Task Route
router.put("/:id/", middleware.checkTaskOwnership, function(req, res){
	//find and update the correct task
	Task.findByIdAndUpdate(req.params.id, req.body.task, function(err, updatedTask){
		if(err){
			res.redirect("/tasks")
		} else {
			//redirect show task page
			res.redirect("/tasks/" + req.params.id);
		}	   
   });
});

// Destroy Task route
router.delete("/:id", middleware.checkTaskOwnership, function(req, res){
	Task.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/tasks");
		} else {
			res.redirect("/tasks")
		}
	});
});

module.exports = router;
