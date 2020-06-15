const express	=	require("express");
const router	=	express.Router();
const passport = require("passport");
const User = require("../models/user");

//////////////////////////
//// ROUTES  ////////////
////////////////////////

//root route
router.get("/", function(req, res){
    res.render("landing")
});

router.get("/todo", function(req, res){
   res.render("index") 
});


////////////////
//AUTHS ROUTES//
////////////////

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//handles sign up logic
router.post("/register", function(req,res,next){
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
    		console.log(err);
    		return res.render("register", {error: err.message});
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to Timeagent " + user.username);
            res.redirect("/tasks");
		});
	});
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//handling login logic
router.post("/login",passport.authenticate("local", {
		successRedirect: "/tasks",
		failureRedirect: "/login"
}) , function(req, res){
});

//Logout route
router.get("/logout", function(req, res){
	req.logout();
    req.flash("success", "Successfully Logged Out");
	res.redirect("/tasks");
});



module.exports = router;