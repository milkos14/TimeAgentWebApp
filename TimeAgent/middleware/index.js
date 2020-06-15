const Task        = require("../models/task");
const Comment    = require("../models/comment");
//middleware
const middlewareObject = {};

middlewareObject.checkTaskOwnership = function (req, res, next){
   if(req.isAuthenticated()){
       Task.findById(req.params.id, function(err, foundTask){
          if(err){
            req.flash("error", "Task not found");
            res.redirect("back");
          }
          else{
            if(foundTask.author.id.equals(req.user.id)){
              next();  
            } else {
                req.flash("error", "You do not have permission to do that");
                res.redirect("back");                      
            }
          }
    });
    } else {
        res.redirect("back");
    }
}

middlewareObject.checkCommentOwnership = function (req, res, next){
    if(req.isAuthenticated()){
           Comment.findById(req.params.comment_id, function(err, foundComment){
              if(err){
                res.redirect("back");
              }
                else{
                    if(foundComment.author.id.equals(req.user.id)){
                      next();  
                    } else {
                        req.flash("error", "You don't have permission to do that");
                        res.redirect("back");     
                    }
                }
    });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObject.isLoggedIn = function (req,res, next){
	if(req.isAuthenticated()){
		return next();
	}
    req.flash("error", "Please Login First!");
	res.redirect("/login");
	
}

module.exports = middlewareObject;